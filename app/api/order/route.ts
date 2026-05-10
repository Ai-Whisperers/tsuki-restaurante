import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const LOG_FILE = "/tmp/tsuki-orders.log";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

interface OrderBody {
  items: OrderItem[];
  total?: number;
  name?: string;
  deliveryMethod?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
  observation?: string;
  timestamp?: string;
}

async function ensureLogFile() {
  const dir = "/tmp";
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function sendToEvolutionAPI(order: OrderBody): Promise<void> {
  if (!EVOLUTION_API_KEY) return;

  try {
    // Build a clean text summary for the notification
    const itemsText = order.items
      .map((i) => `  • ${i.name} x${i.qty} — ${i.price}`)
      .join("\n");

    const message = [
      "🧾 *Nuevo Pedido - Tsuki Restaurante*",
      "",
      itemsText,
      "",
      `*Total:* Gs ${(order.total || 0).toLocaleString("es-PY")}`,
      "━━━━━━━━━━━━━━━━",
      `*Nombre:* ${order.name || "No especificado"}`,
      `*Modalidad:* ${order.deliveryMethod === "delivery" ? "Delivery" : "Retiro en local"}`,
      ...(order.deliveryMethod === "delivery" && order.deliveryAddress
        ? [`*Dirección:* ${order.deliveryAddress}`]
        : []),
      `*Pago:* ${order.paymentMethod === "transfer" ? "Transferencia" : "Efectivo"}`,
      ...(order.observation ? [`*Observaciones:* ${order.observation}`] : []),
      ...(order.timestamp ? [`*Fecha/Hora:* ${order.timestamp}`] : []),
    ].join("\n");

    // Evolution API typically listens on port 3001
    const baseUrl = process.env.EVOLUTION_API_URL || "http://localhost:3001";

    // Try to get the first connected instance
    const instancesRes = await fetch(`${baseUrl}/instance/fetchInstances`, {
      headers: {
        "apikey": EVOLUTION_API_KEY,
      },
    });

    if (!instancesRes.ok) {
      console.warn("[order-api] Evolution API returned status", instancesRes.status);
      return;
    }

    const instances = await instancesRes.json();
    if (!Array.isArray(instances) || instances.length === 0) {
      console.warn("[order-api] No Evolution API instances found");
      return;
    }

    // Find a connected instance
    const connectedInstance = instances.find(
      (inst: any) => inst.connectionStatus === "open"
    );

    if (!connectedInstance) {
      console.warn("[order-api] No connected Evolution API instance available");
      return;
    }

    const instanceName = connectedInstance.instanceName;

    // Send a text notification to the restaurant's own number (the admin)
    // This uses Evolution API's sendText endpoint
    const sendRes = await fetch(
      `${baseUrl}/message/sendText/${instanceName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          number: "595974161698", // The restaurant's WhatsApp number
          text: message,
        }),
      }
    );

    if (!sendRes.ok) {
      const errText = await sendRes.text();
      console.warn("[order-api] Evolution API send failed:", errText.substring(0, 200));
    } else {
      console.log("[order-api] Notification sent via Evolution API");
    }
  } catch (err) {
    console.warn("[order-api] Evolution API error (non-blocking):", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderBody = await request.json();

    // Validate at least items array is present
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Items array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Add server-side timestamp if not provided
    const logEntry = {
      ...body,
      serverTimestamp: new Date().toISOString(),
      source: "tsuki-restaurante",
    };

    // Append to log file
    await ensureLogFile();
    await appendFile(LOG_FILE, JSON.stringify(logEntry) + "\n");

    // Fire-and-forget Evolution API notification (if configured)
    if (EVOLUTION_API_KEY) {
      // Don't await — fire and forget
      sendToEvolutionAPI(body).catch((err) =>
        console.warn("[order-api] Background notification failed:", err)
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[order-api] Error processing order:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

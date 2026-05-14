import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "content", "es.json");

function readContent() {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeContent(data: any) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/admin/weekly — return current weekly special
export async function GET() {
  try {
    const data = readContent();
    const weeklySpecial = data.home?.weeklySpecial || null;
    return NextResponse.json({ weeklySpecial });
  } catch (err) {
    return NextResponse.json({ error: "No se pudo leer el contenido" }, { status: 500 });
  }
}

// PUT /api/admin/weekly — update weekly special
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readContent();

    // Validate required fields
    const item = body.item;
    if (!item?.name || !item?.price) {
      return NextResponse.json(
        { error: "Nombre y precio son requeridos" },
        { status: 400 }
      );
    }

    // Merge with existing or create new
    data.home = data.home || {};
    data.home.weeklySpecial = {
      title: body.title || "Especial de la Semana",
      subtitle: body.subtitle || "Plato limitado — renovamos cada semana",
      badge: body.badge || "Nuevo",
      validDays: body.validDays || null,
      item: {
        name: item.name,
        description: item.description || "",
        price: item.price,
        originalPrice: item.originalPrice || null,
        category: item.category || null,
      },
      ctaText: body.ctaText || "Pedir este Plato",
      ctaHref: body.ctaHref || `https://wa.me/595974161698?text=Hola!%20Quiero%20pedir%20el%20Especial%20de%20la%20Semana%3A%20${encodeURIComponent(item.name)}`,
    };

    writeContent(data);

    return NextResponse.json({ success: true, weeklySpecial: data.home.weeklySpecial });
  } catch (err) {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
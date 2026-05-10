import { Metadata } from "next";
import QRCode from "qrcode";

export const metadata: Metadata = {
  title: "QR — Tsuki Restaurante Oriental",
  description: "Escaneá este código QR para pedir directo desde tu celular en Tsuki Restaurante Oriental",
  robots: {
    index: false,
    follow: false,
  },
};

async function generateQrSvg(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    margin: 2,
    width: 300,
    color: {
      dark: "#1a1a1a",
      light: "#ffffff",
    },
  });
}

export default async function QrPage() {
  const qrSvg = await generateQrSvg("https://tsuki.paragu-ai.com/pedidos");

  return (
    <>
      {/* Print-only background overlay */}
      <style>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header, footer, .whatsapp-float {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .qr-page {
            min-height: 100vh !important;
            padding: 2rem !important;
            background: white !important;
          }
          .qr-page h1 {
            font-size: 2rem !important;
          }
          .qr-page svg {
            max-width: 400px !important;
            height: auto !important;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>

      <section className="qr-page min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
        {/* Restaurant name */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 text-center font-[var(--font-heading)]">
          Tsuki Restaurante Oriental
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#555] mb-8 text-center">
          Pedí desde tu mesa
        </p>

        {/* QR Code */}
        <div
          className="mb-8"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />

        {/* Instruction */}
        <p className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-2 text-center">
          Escaneá este código para pedir
        </p>
        <p className="text-base md:text-lg text-[#666] text-center max-w-md">
          Mostrale este código a tu mesero para pedir directo desde tu celular
        </p>

        {/* URL shown for reference */}
        <p className="mt-8 text-xs text-[#999] text-center font-mono">
          tsuki.paragu-ai.com/pedidos
        </p>
      </section>
    </>
  );
}

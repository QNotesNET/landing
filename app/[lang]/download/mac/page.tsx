"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DownloadMacPage() {
  // 👉 Auto-Download starten
  useEffect(() => {
    const downloadUrl =
      "https://github.com/QNotesNET/desktop-app/releases/download/v1.0.2/powerbook-1.0.2.dmg";

    // kleine Verzögerung, damit das UI kurz lädt
    setTimeout(() => {
      window.location.href = downloadUrl;
    }, 800);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/2/2235.png"
          alt="macOS"
          width={64}
          height={64}
          className="mx-auto mb-6"
        />

        <h1 className="text-3xl font-semibold text-gray-900">
          Powrbook für macOS
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Der Download startet automatisch. Falls nicht, klicke unten.
        </p>

        <a
          href="https://github.com/QNotesNET/desktop-app/releases/download/v1.0.2/powerbook-1.0.2.dmg"
          className="mt-8 inline-block bg-gray-800 hover:bg-black text-white font-medium px-6 py-3 rounded-xl shadow transition"
        >
          Download erneut starten
        </a>
      </div>
    </main>
  );
}

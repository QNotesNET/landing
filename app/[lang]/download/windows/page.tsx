"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DownloadWindowsPage() {
  // 👉 Auto-Download starten
  useEffect(() => {
    const downloadUrl =
      "https://github.com/QNotesNET/desktop-app/releases/download/v1.0.2/Powerbook-1.0.2-win.exe";

    setTimeout(() => {
      window.location.href = downloadUrl;
    }, 800); // kleine Verzögerung für besseres UI
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/1/1816.png"
          alt="Windows"
          width={64}
          height={64}
          className="mx-auto mb-6"
        />

        <h1 className="text-3xl font-semibold text-gray-900">
          Powerbook für Windows
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Der Download startet automatisch. Falls nicht, klicke unten.
        </p>

        <a
          href="https://github.com/QNotesNET/desktop-app/releases/download/v1.0.2/Powerbook-1.0.2-win.exe"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition"
        >
          Download erneut starten
        </a>
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";

export default function DownloadRedirect() {
  const ua =
    typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";

  if (ua.includes("windows")) {
    redirect("/download/windows");
  }

  if (ua.includes("mac") || ua.includes("darwin")) {
    redirect("/download/mac");
  }

  redirect("/mobile"); // fallback
}

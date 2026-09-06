import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "100-Day English Mastery",
  description: "Learn English over a structured 100-day course tailored for Gujarati speakers.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

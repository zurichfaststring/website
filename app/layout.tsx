import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TranslationProvider } from "@/lib/translations";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zurich Fast String - Service de cordage rapide et professionnel",
  description: "Service de cordage rapide de raquettes de tennis à Zürich. 25 CHF par raquette, délai 24-48h. Réservation en ligne simple et rapide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}

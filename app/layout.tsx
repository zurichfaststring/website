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
  title: "Zurich Fast String - Professional Stringing Service",
  description: "Professional and fast tennis racket stringing service in Zürich. 25 CHF per racket, 24-48h turnaround. Simple online booking.",
  icons: {
    icon: '/logo-min.png',
    shortcut: '/logo-min.png',
    apple: '/logo-min.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

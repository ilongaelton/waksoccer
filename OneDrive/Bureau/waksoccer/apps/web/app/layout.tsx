import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "waksoccer ⚽ — 100% Free Soccer Data",
  description: "Live soccer standings for 20+ major leagues worldwide. Completely free, no ads, no subscription required.",
  openGraph: { 
    title: "waksoccer ⚽ - Free Soccer Data", 
    type: "website",
    description: "Live soccer standings for 20+ major leagues worldwide. Completely free, no ads, no subscription required."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-green-600">
                waksoccer ⚽
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-green-600">
                  Leagues
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-green-600">
                  About
                </Link>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  100% FREE
                </span>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
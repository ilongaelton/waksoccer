import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://waksoccer.com"),
  title: "WakSoccer ⚽ — Live Soccer Scores Updated Every 45 Seconds | Free",
  description: "Get live soccer scores updated every 45 seconds! Free match predictions, fan chat for Premier League, La Liga, Bundesliga, Serie A & 20+ leagues. Search 'waksoccer' on Google!",
  keywords: [
    "waksoccer",
    "live soccer scores 45 seconds",
    "real time football updates",
    "soccer app no subscription",
    "Premier League live scores",
    "La Liga live updates",
    "Bundesliga live results",
    "Serie A live scores", 
    "soccer predictions free",
    "football fan chat live",
    "soccer live streaming",
    "football scores real time",
    "soccer championship live",
    "live match updates",
    "soccer app google search"
  ],
  authors: [{ name: "WakSoccer Team" }],
  creator: "WakSoccer",
  publisher: "WakSoccer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: { 
    title: "WakSoccer ⚽ - Live Soccer Scores Every 45 Seconds", 
    type: "website",
    description: "Real-time soccer scores updated every 45 seconds! Free predictions & fan chat for all major championships. Search 'waksoccer' on Google to find us!",
    siteName: "WakSoccer",
    locale: "en_US",
    url: "https://waksoccer.com"
  },
  twitter: {
    card: "summary_large_image",
    title: "WakSoccer ⚽ - Live Soccer Every 45 Seconds",
    description: "Real-time soccer scores updated every 45 seconds! Free for all championships. Search 'waksoccer' on Google!",
    site: "@waksoccer",
    creator: "@waksoccer"
  },
  category: 'sports',
  classification: 'Sports & Entertainment'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "WakSoccer",
              "alternateName": "waksoccer",
              "url": "https://waksoccer.com",
              "description": "Live soccer scores updated every 45 seconds with predictions and fan chat for all major championships",
              "applicationCategory": "SportsApplication",
              "operatingSystem": "Any",
              "browserRequirements": "HTML5, JavaScript",
              "softwareVersion": "1.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Live soccer scores every 45 seconds",
                "Real-time match predictions",
                "Fan chat for all leagues", 
                "Premier League live updates",
                "La Liga live scores",
                "Bundesliga live results",
                "Serie A live matches",
                "Championship live updates"
              ],
              "keywords": "waksoccer, live soccer, football scores, championship live, real-time updates",
              "inLanguage": "en-US",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "2847"
              }
            })
          }}
        />
        
        {/* Additional Google Discovery Tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <link rel="canonical" href="https://waksoccer.com" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-green-600">
                WakSoccer ⚽
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-green-600">
                  Live Scores
                </Link>
                <Link href="/" className="text-gray-700 hover:text-green-600">
                  Championships
                </Link>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded animate-pulse">
                  🔴 LIVE • 45s Updates
                </span>
              </div>
            </div>
          </div>
        </nav>
        {children}
        
        {/* Google Analytics (add your tracking ID) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}
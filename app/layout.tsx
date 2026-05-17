import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const SITE_URL = "https://qmeeguide.vercel.app";
const AFFILIATE = "https://qm.ee/r/tMfRPSm60cA";

export const metadata: Metadata = {
  title: { default: "Qmee Reviews, Tips & How to Make Money with Surveys", template: "%s | Qmee Guide" },
  description: "Honest Qmee reviews, tips to maximize earnings, survey strategies, cashback guides, and everything you need to make real money with Qmee.",
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: "Qmee Guide", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-PLACEHOLDER');` }} />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-bold text-lg text-green-500 hover:text-green-600">🐷 Qmee Guide</a>
            <a href={AFFILIATE} target="_blank" rel="noopener noreferrer"
              className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-colors">
              Join Qmee Free →
            </a>
          </div>
        </header>
        <div className="bg-green-50 border-b border-green-200 text-center text-xs text-green-800 py-2 px-4">
          <strong>Affiliate Disclosure:</strong> We may earn a commission when you sign up through our links, at no extra cost to you.
        </div>
        <main>{children}</main>
        <footer className="border-t border-gray-100 mt-16 py-8 text-center text-sm text-gray-500">
          <p>Qmee Guide is an independent review site. We may earn a commission when you use our links.</p>
          <p className="mt-2 flex items-center justify-center gap-4">
            <a href="/" className="underline hover:text-gray-700">All Guides</a>
            <a href="/affiliate-disclosure" className="underline hover:text-gray-700">Affiliate Disclosure</a>
            <a href="/privacy-policy" className="underline hover:text-gray-700">Privacy Policy</a>
          </p>
        </footer>
      </body>
    </html>
  );
}

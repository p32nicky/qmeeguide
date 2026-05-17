import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const AFFILIATE = "https://qm.ee/r/tMfRPSm60cA";

export const metadata: Metadata = {
  title: "Qmee Review: Make Money with Surveys, Cashback & Gaming",
  description: "Honest Qmee reviews, earning tips, and guides to maximize your income from surveys, cashback, and gaming with the Qmee app.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Qmee Guide",
  url: "https://qmeeguide.vercel.app",
  description: "Honest reviews and earning tips for the Qmee survey and cashback app.",
  potentialAction: { "@type": "SearchAction", target: "https://qmeeguide.vercel.app/?q={search_term_string}", "query-input": "required name=search_term_string" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Qmee Guide",
  url: "https://qmeeguide.vercel.app",
};

export default function HomePage() {
  const articles = getAllArticles();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-400 to-green-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <Image src="/images/logo.png" alt="Qmee" width={140} height={50} className="mb-6 mx-auto lg:mx-0" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Make Money Taking Surveys <span className="text-yellow-300">Anytime, Anywhere</span>
            </h1>
            <p className="text-green-100 text-lg mb-6 max-w-xl">
              Qmee pays you real cash for surveys, cashback shopping, and gaming. Cash out instantly to PayPal or Venmo — no minimum balance required.
            </p>
            <a href={AFFILIATE} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-3 rounded-full text-lg transition-colors">
              Join Qmee Free — Start Earning →
            </a>
            <p className="text-green-200 text-sm mt-3">Surveys · Cashback · Gaming · Instant PayPal</p>
          </div>
          <div className="flex-1 flex justify-center gap-4">
            <Image src="/images/app-surveys.png" alt="Qmee survey earnings app" width={200} height={380} className="rounded-3xl shadow-2xl" />
            <Image src="/images/app-earning.png" alt="Qmee Ka-ching earning screen" width={200} height={380} className="rounded-3xl shadow-2xl hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-white py-10 border-b">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["💰", "Instant Cash Out", "PayPal, Venmo & gift cards"],
            ["📱", "Surveys On the Go", "Anytime, anywhere earning"],
            ["🛍️", "Cashback Shopping", "Earn on everyday purchases"],
            ["🎮", "Earn Gaming", "Play games, get paid"]].map(([icon, title, desc]) => (
            <div key={title as string}>
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-bold text-gray-800">{title}</div>
              <div className="text-sm text-gray-500">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* App screenshots */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Real Earnings, Real Payouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Image src="/images/pig.png" alt="Qmee piggy bank mascot" width={300} height={300} className="mx-auto" />
            </div>
            <div>
              <Image src="/images/app-cashout.png" alt="Qmee PayPal cashout" width={500} height={350} className="rounded-2xl shadow-lg w-full" />
            </div>
          </div>
          <div className="text-center mt-8">
            <a href={AFFILIATE} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full text-lg transition-colors">
              Start Earning with Qmee →
            </a>
          </div>
        </div>
      </div>

      {/* What is Qmee */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-3 text-green-900">What Is Qmee?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-4">
            Qmee is a free app that pays you real money for taking surveys, shopping with cashback, and playing games. You can cash out instantly via PayPal, Venmo, or gift cards — with no minimum balance. It's one of the most flexible ways to earn extra cash in your spare time.
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
            Join Qmee Free →
          </a>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          {articles.length > 0 ? `${articles.length} Qmee Guides & Reviews` : "Guides Loading..."}
        </h2>
        {articles.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Articles being generated. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`}
                className="block p-5 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all group">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 leading-snug mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{article.metaDescription}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

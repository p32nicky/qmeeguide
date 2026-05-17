import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const AFFILIATE = "https://qm.ee/r/tMfRPSm60cA";
const SITE = "https://qmeeguide.vercel.app";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    openGraph: { title: article.title, description: article.metaDescription, type: "article" },
    alternates: { canonical: `/articles/${slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: article.title, description: article.metaDescription,
    keywords: article.keywords.join(", "),
    datePublished: article.generatedAt, dateModified: article.generatedAt,
    author: { "@type": "Organization", name: "Qmee Guide", url: SITE },
    publisher: { "@type": "Organization", name: "Qmee Guide", url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/articles/${slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: article.title, item: `${SITE}/articles/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-green-500">Home</a></li>
            <li>›</li>
            <li className="text-gray-400">{article.title}</li>
          </ol>
        </nav>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-gray-700 font-medium">Join Qmee free — earn cash from surveys, cashback & gaming.</p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors whitespace-nowrap">
            Join Qmee Free →
          </a>
        </div>

        <article
          className="prose prose-gray prose-headings:font-bold prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <div className="mt-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Earning?</h2>
          <p className="mb-6 text-green-100">Join Qmee free and start making money from surveys, cashback, and gaming. Cash out instantly via PayPal.</p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-3 rounded-full transition-colors">
            Join Qmee — It's Free →
          </a>
          <p className="text-xs text-green-200 mt-3">No minimum cashout · Instant PayPal · Free to join</p>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 underline">← All Qmee guides</a>
        </div>
      </div>
    </>
  );
}

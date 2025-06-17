import Search from "./search";
import { Suspense } from "react";
import  Loading from "@/app/(website)/[lang]/loading";

export async function generateStaticParams() {
  const langs = ["en", "es"]; // Add your supported languages here
  const params = langs.map(lang => ({
      lang,
  }));
  return params;
}

export async function generateMetadata({ params }) {
  const lang = params.lang;
  const query = "busqueda"; // adjust if query param name is different
  const baseUrl = "https://www.fundacioncentroeducativodepanama.org";

  const canonical = query
    ? `${baseUrl}/${lang}/search?q=${encodeURIComponent(query)}`
    : `${baseUrl}/${lang}/search`;

  const title = query
    ? lang === "es"
      ? `Resultados de búsqueda para "${query}" | Fundación Centro Educativo de Panamá`
      : `Search results for "${query}" | Fundación Centro Educativo de Panamá`
    : lang === "es"
    ? "Página de búsqueda | Fundación Centro Educativo de Panamá"
    : "Search Page | Fundación Centro Educativo de Panamá";

  const description = query
    ? lang === "es"
      ? `Resultados de búsqueda para "${query}" en Fundación Centro Educativo de Panamá.`
      : `Search results for "${query}" at Fundación Centro Educativo de Panamá.`
    : lang === "es"
    ? "Busca artículos y recursos en Fundación Centro Educativo de Panamá."
    : "Search articles and resources at Fundación Centro Educativo de Panamá.";

  const keywordsEs = "búsqueda, artículos, educación islámica, Fundación Centro Educativo de Panamá";
  const keywordsEn = "search, articles, Islamic education, Fundación Centro Educativo de Panamá";

  const image = `${baseUrl}/images/asset-2.jpg`;

  // JSON-LD for SearchResultsPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: title,
    description,
    url: canonical,
    inLanguage: lang === "es" ? "es" : "en",
    publisher: {
      "@type": "Organization",
      name: "Fundación Centro Educativo de Panamá",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
        es: `${baseUrl}/es/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
      },
    },
    keywords: lang === "es" ? keywordsEs : keywordsEn,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Fundación Centro Educativo de Panamá",
      locale: lang === "es" ? "es_PA" : "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: lang === "es" ? "Búsqueda Fundación Centro Educativo" : "Fundación Centro Educativo Search",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true, // optional: avoid caching of dynamic search results
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/appletouchicon.png",
    },
    category: "search",
    generator: "Next.js 14 + Sanity CMS",
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}


export default async function SearchPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <Search lang={params.lang} />
    </Suspense>

  );
}

// export const revalidate = 60;

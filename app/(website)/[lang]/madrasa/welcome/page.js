// import { getSettings } from "@/lib/sanity/client";
import Welcome from "./welcome";
import { getWelcomeContentPage, getPostById } from "@/lib/sanity/client";
import { Suspense } from "react";
import Loading from "@/app/(website)/[lang]/loading";

export async function generateStaticParams() {
  const langs = ["en", "es"]; // Add your supported languages here
  const params = langs.map((lang) => ({
    lang,
  }));
  return params;
}

export async function generateMetadata({ params }) {
  const { lang } = params;
  const baseUrl = "https://www.fundacioncentroeducativodepanama.org";

  const title =
    lang === "es"
      ? "Bienvenidos | Fundación Centro Educativo de Panamá"
      : "Welcome | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Bienvenidos a la Fundación Centro Educativo de Panamá. Desde 1996, ofrecemos educación islámica de calidad con valores, integridad y excelencia académica."
      : "Welcome to Fundación Centro Educativo de Panamá. Since 1996, we have provided quality Islamic education grounded in values, integrity, and academic excellence.";

  const canonical = `${baseUrl}/${lang}/welcome`;
  const keywords =
    lang === "es"
      ? "Bienvenida, Fundación Centro Educativo de Panamá, educación islámica, escuela en Panamá"
      : "Welcome, Fundación Centro Educativo de Panamá, Islamic education, school in Panama";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
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
        en: `${baseUrl}/en/welcome`,
        es: `${baseUrl}/es/welcome`,
      },
    },
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Fundación Centro Educativo de Panamá",
      locale: lang === "es" ? "es_PA" : "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            lang === "es"
              ? "Bienvenida a la Fundación Centro Educativo de Panamá"
              : "Welcome to Fundación Centro Educativo de Panamá",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
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
      apple: "/appletouchicon.png",
    },
    category: "education",
    generator: "Next.js 14 + Sanity CMS",
    other: {
      "script:ld+json": JSON.stringify(structuredData),
    },
  };
}


export default async function WelcomePage({ params }) {
  // Fetch data and post
  const data = await getWelcomeContentPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <Welcome data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

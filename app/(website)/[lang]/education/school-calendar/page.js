// import { getSettings } from "@/lib/sanity/client";
import SchoolCalendar from "./schoolCalendar";
import { getSchoolCalendarPage, getPostById } from "@/lib/sanity/client";
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
      ? "Calendario Escolar | Fundación Centro Educativo de Panamá"
      : "School Calendar | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Consulta el calendario escolar de la Fundación Centro Educativo de Panamá. Fechas importantes, vacaciones, eventos y más."
      : "Check the school calendar of Fundación Centro Educativo de Panamá. Important dates, holidays, events, and more.";

  const canonical = `${baseUrl}/${lang}/calendar`;
  const keywords =
    lang === "es"
      ? "calendario escolar, fechas académicas, vacaciones escolares, eventos escolares, Fundación Centro Educativo de Panamá"
      : "school calendar, academic dates, school holidays, school events, Fundación Centro Educativo de Panamá";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    inLanguage: lang === "es" ? "es" : "en",
    publisher: {
      "@type": "EducationalOrganization",
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
        en: `${baseUrl}/en/calendar`,
        es: `${baseUrl}/es/calendar`,
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
              ? "Calendario Escolar de la Fundación Centro Educativo de Panamá"
              : "School Calendar of Fundación Centro Educativo de Panamá",
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


export default async function SchoolCalendarPage({ params }) {
  // Fetch data and post
  const data = await getSchoolCalendarPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <SchoolCalendar data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

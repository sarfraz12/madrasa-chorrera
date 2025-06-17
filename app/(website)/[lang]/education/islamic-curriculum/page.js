// import { getSettings } from "@/lib/sanity/client";
import IslamicCurriculum from "./islamicCurriculum";
import { getIslamicCurriculumPage, getPostById } from "@/lib/sanity/client";
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
      ? "Currículo Islámico | Fundación Centro Educativo de Panamá"
      : "Islamic Curriculum | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Descubre nuestro currículo islámico enfocado en el Corán, Hadiz, Fiqh y valores islámicos, brindando una formación integral desde temprana edad."
      : "Explore our Islamic curriculum focused on Quran, Hadith, Fiqh, and Islamic values, offering holistic education from an early age.";

  const canonical = `${baseUrl}/${lang}/curriculum/islamic`;
  const keywords =
    lang === "es"
      ? "currículo islámico, estudios islámicos, Corán, Hadiz, Fiqh, valores islámicos, educación en Panamá"
      : "Islamic curriculum, Islamic studies, Quran, Hadith, Fiqh, Islamic values, education in Panama";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Fundación Centro Educativo de Panamá",
      sameAs: baseUrl,
    },
    inLanguage: lang === "es" ? "es" : "en",
    educationalLevel: "Primary through Secondary",
    url: canonical,
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/curriculum/islamic`,
        es: `${baseUrl}/es/curriculum/islamic`,
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
              ? "Currículo Islámico en la Fundación Centro Educativo de Panamá"
              : "Islamic Curriculum at Fundación Centro Educativo de Panamá",
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


export default async function IslamicCurriculumPage({ params }) {
  // Fetch data and post
  const data = await getIslamicCurriculumPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <IslamicCurriculum data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

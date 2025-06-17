// import { getSettings } from "@/lib/sanity/client";
import SchoolCurriculum from "./schoolCurriculum";
import { getSchoolCurriculumPage, getPostById } from "@/lib/sanity/client";
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
      ? "Currículo Académico | Fundación Centro Educativo de Panamá"
      : "Academic Curriculum | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Conoce nuestro currículo académico alineado con MEDUCA. Ofrecemos materias como Matemáticas, Ciencias, Español, Inglés, y más para una formación integral."
      : "Discover our academic curriculum aligned with Panama's Ministry of Education (MEDUCA), including Math, Science, Spanish, English, and more for a complete education.";

  const canonical = `${baseUrl}/${lang}/curriculum/academic`;
  const keywords =
    lang === "es"
      ? "currículo académico, materias escolares, educación básica, MEDUCA, Fundación Centro Educativo de Panamá"
      : "academic curriculum, school subjects, basic education, MEDUCA Panama, Fundación Centro Educativo de Panamá";

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
    educationalLevel: "Primary through Secondary",
    inLanguage: lang === "es" ? "es" : "en",
    url: canonical,
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/curriculum/academic`,
        es: `${baseUrl}/es/curriculum/academic`,
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
              ? "Currículo Académico en Fundación Centro Educativo de Panamá"
              : "Academic Curriculum at Fundación Centro Educativo de Panamá",
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



export default async function SchoolCurriculumPage({ params }) {
  // Fetch data and post
  const data = await getSchoolCurriculumPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <SchoolCurriculum data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

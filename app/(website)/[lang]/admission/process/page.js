// import { getSettings } from "@/lib/sanity/client";
import Process from "./process";
import { getAdmissionProcessPage, getPostById } from "@/lib/sanity/client";
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
      ? "Proceso de Admisión | Fundación Centro Educativo de Panamá"
      : "Admissions Process | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Infórmate sobre los pasos para inscribirte en la Fundación Centro Educativo de Panamá. Aceptamos estudiantes de diversas nacionalidades y niveles educativos."
      : "Learn about the steps to enroll at Fundación Centro Educativo de Panamá. We welcome students of all nationalities and grade levels.";

  const canonical = `${baseUrl}/${lang}/admissions`;
  const keywords =
    lang === "es"
      ? "admisión escolar, inscripción, proceso de admisión, colegio islámico, Fundación Educativa Panamá"
      : "school admissions, enrollment process, Islamic school, Fundación Educativa Panamá";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: title,
    educationalProgramMode: "full-time",
    educationalLevel: "Primary through Secondary",
    description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Fundación Centro Educativo de Panamá",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    hasCourse: [
      {
        "@type": "Course",
        name: lang === "es" ? "Educación Básica" : "Basic Education",
      },
      {
        "@type": "Course",
        name: lang === "es" ? "Educación Media" : "Secondary Education",
      },
    ],
    applicationDeadline: "2025-01-15", // Adjust if dynamic
    applicationStartDate: "2024-10-01", // Adjust if dynamic
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
        en: `${baseUrl}/en/admissions`,
        es: `${baseUrl}/es/admissions`,
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
              ? "Proceso de admisión en Fundación Centro Educativo de Panamá"
              : "Admissions process at Fundación Centro Educativo de Panamá",
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


export default async function AdmissionProcessPage({ params }) {
  // Fetch data and post
  const data = await getAdmissionProcessPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <Process data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

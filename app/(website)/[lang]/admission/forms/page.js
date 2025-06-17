// import { getSettings } from "@/lib/sanity/client";
import Forms from "./forms";
import { getAdmissionFormsPage, getPostById } from "@/lib/sanity/client";
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
      ? "Formulario de Admisión | Fundación Centro Educativo de Panamá"
      : "Admission Form | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Completa el formulario de admisión para inscribirte en nuestra institución educativa islámica en Panamá. Proceso fácil y accesible para todos."
      : "Fill out the admission form to enroll at our Islamic educational institution in Panama. Easy and accessible application process.";

  const canonical = `${baseUrl}/${lang}/admissions/form`;
  const keywords =
    lang === "es"
      ? "formulario de admisión, inscripción escolar, colegio islámico Panamá, Fundación Educativa"
      : "admission form, school enrollment, Islamic school Panama, educational foundation";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    about: {
      "@type": "EducationalOrganization",
      name: "Fundación Centro Educativo de Panamá",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "Action",
      name: lang === "es" ? "Enviar formulario de admisión" : "Submit admission form",
      target: {
        "@type": "EntryPoint",
        urlTemplate: canonical,
        actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
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
        en: `${baseUrl}/en/admissions/form`,
        es: `${baseUrl}/es/admissions/form`,
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
              ? "Formulario de inscripción escolar en Fundación Centro Educativo de Panamá"
              : "School admission form at Fundación Centro Educativo de Panamá",
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
  const data = await getAdmissionFormsPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <Forms data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

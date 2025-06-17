import { getAllAuthors, getAboutPage } from "@/lib/sanity/client";
import About from "./about";
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
  const { lang } = params;
  const baseUrl = "https://www.fundacioncentroeducativodepanama.org";

  const title =
    lang === "es"
      ? "Sobre Nosotros | Fundación Centro Educativo de Panamá"
      : "About Us | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Conoce más sobre la historia, misión y visión de la Fundación Centro Educativo de Panamá, una institución islámica dedicada a la formación integral desde 1996."
      : "Learn more about the history, mission, and vision of Fundación Centro Educativo de Panamá, an Islamic institution dedicated to comprehensive education since 1996.";

  const canonical = `${baseUrl}/${lang}/about`;
  const keywords =
    lang === "es"
      ? "Fundación Centro Educativo de Panamá, historia, misión, visión, educación islámica"
      : "Fundación Centro Educativo de Panamá, history, mission, vision, Islamic education";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fundación Centro Educativo de Panamá",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "La Chorrera, El Espino, Calle Principal",
      addressLocality: "Panamá Oeste",
      addressRegion: "PA",
      postalCode: "0701",
      addressCountry: "PA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+507 6347 0924",
      contactType: "Customer Service",
    },
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/about`,
        es: `${baseUrl}/es/about`,
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
              ? "Sobre la Fundación Centro Educativo de Panamá"
              : "About Fundación Centro Educativo de Panamá",
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

export default async function AboutPage({ params }) {
  const authors = await getAllAuthors();
  const data = await getAboutPage(params.lang);


  return (
    <Suspense fallback={<Loading />}>
      <About data={data[0]} authors={authors} lang={params.lang} />
    </Suspense>

  );
}

// export const revalidate = 60;

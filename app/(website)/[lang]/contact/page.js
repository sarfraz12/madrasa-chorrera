import { getSettings } from "@/lib/sanity/client";
import Contact from "./contact";
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
      ? "Contáctanos | Fundación Centro Educativo de Panamá"
      : "Contact Us | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "¿Tienes preguntas o deseas más información? Contáctanos para conocer más sobre nuestra institución educativa en Panamá."
      : "Have questions or want more information? Contact us to learn more about our educational institution in Panama.";

  const canonical = `${baseUrl}/${lang}/contact`;
  const keywords =
    lang === "es"
      ? "contacto, escuela islámica Panamá, fundación educativa, preguntas, información"
      : "contact, Islamic school Panama, educational foundation, questions, information";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Fundación Centro Educativo de Panamá",
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "La Chorrera, El Espino, Calle Principal",
      addressLocality: "Panamá Oeste",
      postalCode: "0701",
      addressCountry: "PA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+507 6347 0924",
      contactType: "Customer Service",
      availableLanguage: ["Spanish", "English"],
    },
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/contact`,
        es: `${baseUrl}/es/contact`,
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
              ? "Información de contacto de la Fundación Centro Educativo de Panamá"
              : "Contact information for Fundación Centro Educativo de Panamá",
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


export default async function ContactPage({ params }) {
  const settings = await getSettings();
  return (
    <Suspense fallback={<Loading />}>
      <Contact settings={settings} lang={params.lang} />
    </Suspense>

  );
}

// export const revalidate = 60;

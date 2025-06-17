// import { getSettings } from "@/lib/sanity/client";
import Donations from "./donations";
import { getDonationsPage, getPostById } from "@/lib/sanity/client";
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
      ? "Haz tu Donación | Fundación Centro Educativo de Panamá"
      : "Make a Donation | Fundación Centro Educativo de Panamá";

  const description =
    lang === "es"
      ? "Apoya la educación islámica y académica en Panamá. Tu donación contribuye a transformar vidas y fortalecer los valores."
      : "Support Islamic and academic education in Panama. Your donation helps transform lives and strengthen values.";

  const canonical = `${baseUrl}/${lang}/donations`;
  const keywords =
    lang === "es"
      ? "donaciones, apoyar educación islámica, ayudar estudiantes, fundación educativa islámica, Panamá"
      : "donations, support Islamic education, help students, Islamic educational foundation, Panama";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: title,
    description,
    target: `${baseUrl}/${lang}/donations`,
    recipient: {
      "@type": "EducationalOrganization",
      name: "Fundación Centro Educativo de Panamá",
      url: baseUrl,
    },
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/donations`,
        es: `${baseUrl}/es/donations`,
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
              ? "Haz tu donación a Fundación Centro Educativo de Panamá"
              : "Donate to Fundación Centro Educativo de Panamá",
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
    category: "philanthropy",
    generator: "Next.js 14 + Sanity CMS",
    other: {
      "script:ld+json": JSON.stringify(structuredData),
    },
  };
}


export default async function DonationsPage({ params }) {
  // Fetch data and post
  const data = await getDonationsPage(params.lang);

  const post = data?.[0]?.post?._ref ? await getPostById(data[0].post._ref, params.lang) : null;


  // Ensure renders even if data or post is null/undefined
  return (
    <Suspense fallback={<Loading />}>
      {data?.[0] ? (
        <Donations data={data[0]} post={post} lang={params.lang} />
      ) : (
        <p className="text-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 animate-pulse drop-shadow-lg mt-10">
          No data available for this page.
        </p>
      )}
    </Suspense>
  );
}

// export const revalidate = 60;

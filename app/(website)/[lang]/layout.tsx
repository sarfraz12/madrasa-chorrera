// import type { Metadata } from "next";
import { Inter, Lora, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { Backlink } from "@/components/navigation/backlink";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { getSettings, getNavbarData, getFooterData } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { Suspense } from "react";
import  Loading from "./loading"

// Add inter font with the required subset and variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

// Add lora font with the required subset and variable
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

// Add Oswald font with the required subset and variable
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald"
});


export async function generateMetadata({ params }: any) {
  const { lang } = params;
  const baseUrl = "https://www.fundacioncentroeducativodepanama.org";

  const title =
    lang === "es"
      ? "Fundación Centro Educativo de Panamá | Educación Islámica en Panamá"
      : "Fundación Centro Educativo de Panamá | Islamic Education in Panama";

  const description =
    lang === "es"
      ? "Centro educativo islámico con sede en Panamá ofreciendo educación integral y valores islámicos desde 1996."
      : "Islamic educational center based in Panama offering comprehensive education and Islamic values since 1996.";

  const canonical = `${baseUrl}/${lang}`;
  const keywords =
    lang === "es"
      ? "Educación islámica, Fundación Centro Educativo, escuela islámica, Panamá"
      : "Islamic education, Centro Educativo Foundation, Islamic school, Panama";

  const image = `${baseUrl}/images/asset-2.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name:
      lang === "es"
        ? "Fundación Centro Educativo de Panamá"
        : "Fundación Centro Educativo de Panamá",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
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
    description,
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName:
        lang === "es"
          ? "Fundación Centro Educativo de Panamá"
          : "Fundación Centro Educativo de Panamá",
      locale: lang === "es" ? "es_PA" : "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            lang === "es"
              ? "Fundación Centro Educativo de Panamá"
              : "Fundación Centro Educativo de Panamá",
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


export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode
  params: {lang: string}
}>) {
  const settings = await getSettings();
  const navData = await getNavbarData(params.lang);
  const footData = await getFooterData(params.lang);
  

  return (
    <html suppressHydrationWarning lang="en" 
    className={cx(inter.variable, lora.variable,  oswald.variable,
    )}>
      <body className={cx(inter.className, oswald.className, " dark:bg-black bg-white  text-black dark:text-white")}>
        
        <Providers>
          <Navbar lang={params.lang} {...settings} data={navData} />
          <Suspense fallback={<Loading />}>
            {children}
            <Backlink linkValue={settings.url}  />
          </Suspense>
          <Footer lang={params.lang} data={footData} {...settings} />
        </Providers>

      </body>
    </html>
  );
}

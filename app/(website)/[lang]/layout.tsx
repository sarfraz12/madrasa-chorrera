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

export async function sharedMetaData() {
  const settings = await getSettings();

  return {
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Fundación Centro Educativo Panamá",
      template: "%s | Fundación Centro Educativo Panamá"
    },
    description:
      settings?.description ||
      "Fundación Centro Educativo Panamá se desempeña",
    keywords: ["Next.js", "Sanity", "Tailwind CSS"],
    authors: [{ name: "Fundación Centro Educativo Panamá" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Fundación Centro Educativo Panamá",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata() {
  return await sharedMetaData();
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

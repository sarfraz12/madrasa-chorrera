import PostPage from "./postHome";
import { Suspense } from "react";
import  Loading from "@/app/(website)/[lang]/loading";
import { urlForImage } from "@/lib/sanity/image";

import {
  getAllPostsSlugs,
  getPostBySlug,
  getTopCategories,
} from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const { lang, slug } = params;
  const baseUrl = "https://www.fundacioncentroeducativodepanama.org";
  const post = await getPostBySlug(slug, lang);

  if (!post) {
    return {
      title: "Artículo no encontrado | Fundación Centro Educativo de Panamá",
      description: "El artículo que buscas no está disponible.",
    };
  }

  const canonical = `${baseUrl}/${lang}/all/post/${slug}`;
  const keywords = post.keywords?.join(", ") || 
    (lang === "es"
      ? "Islam, artículos Islámicos, Islam en Panamá"
      : "Islam articles, Islamic blog, Islam in Panama");

  const title = post.title || (lang === "es" ? "Artículo del Blog | Fundación Centro Educativo de Panamá" : "Blog Article | Fundación Centro Educativo de Panamá");
  const description = post.excerpt || post.description || 
    (lang === "es"
      ? "Lee este artículo técnico publicado por Centro Educativo de Panamá."
      : "Read this islamic article by Centro Educativo de Panamá.");

  const image = post?.mainImage
    ? urlForImage(post?.mainImage)?.src
    : `${baseUrl}/images/asset-2.jpg`;

  const datePublished = post?._createdAt;
  const dateModified = post?._updatedAt || post._createdAt;

  // Estructura JSON-LD para artículo
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    telephone: "+507 6347 0924",
    address: {
      "@type": "PostalAddress",
      streetAddress: "La Chorrera, El Espino, Calle Principal",
      addressLocality: "Panamá Oeste",
      addressRegion: "PA",
      postalCode: "0701",
      addressCountry: "PA",
    },
    description: description,
    author: {
      "@type": "Organization",
      name: "Solutekpty",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Solutekpty",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished,
    dateModified,
    image: [image],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/all/post/${slug}`,
        es: `${baseUrl}/es/all/post/${slug}`,
      },
    },
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Solutekpty",
      publishedTime: datePublished,
      modifiedTime: dateModified,
      locale: lang === "es" ? "es_PA" : "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || "Artículo del Blog",
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
    category: "technology",
    generator: "Next.js 14 + Sanity CMS",
    other: {
      "script:ld+json": JSON.stringify(structuredData),
    },
  };
};

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug, params.lang);
  const categories = await getTopCategories(params.lang);

  return (
    <Suspense fallback={<Loading />}>
      <PostPage post={post} categories={categories} lang={params.lang} />
    </Suspense>

  );
};


// export const revalidate = 60

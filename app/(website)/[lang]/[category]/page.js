import CategoryPosts from "./categoryPosts";
import Container from "@/components/generalUse/container";
import { getAllCategories, getPostsByCategory, getAllPosts, getAllCategoriesCount } from "@/lib/sanity/client";
import { Suspense } from "react";
import  Loading from "@/app/(website)/[lang]/loading";
import { urlForImage } from "@/lib/sanity/image";


export async function generateStaticParams() {
  return await getAllCategories();
}

export async function generateMetadata({ params }) {
  const data = await getCategoryPosts(params.category, params.lang);

  const lang = params.lang;
  const baseUrl = "https://www.fundacioncentroeducativodepanama.org";
  const canonical = `${baseUrl}/${lang}/${data?.title?.toLowerCase().replace(/\s+/g, "-") || "all"}`;

  const alternates = {
    canonical,
    languages: {
      en: `${baseUrl}/en/${data?.title?.toLowerCase().replace(/\s+/g, "-") || "all"}`,
      es: `${baseUrl}/es/${data?.title?.toLowerCase().replace(/\s+/g, "-") || "all"}`,
    },
  };

  const image = data.mainImage
    ? urlForImage(data.mainImage)?.src
    : `${baseUrl}/images/asset-2.jpg`;

  const keywordsEs =
    "artículos islámicos, educación islámica, cultura islámica, Fundación Centro Educativo de Panamá";
  const keywordsEn =
    "Islamic articles, Islamic education, Islamic culture, Fundación Centro Educativo de Panamá";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: data?.title || (lang === "es" ? "Categoría del Blog" : "Blog Category"),
    description:
      lang === "es"
        ? "Explora artículos relacionados con la educación islámica, cultura y valores en nuestra Fundación."
        : "Explore articles related to Islamic education, culture, and values in our Foundation.",
    url: canonical,
    image,
    inLanguage: lang === "es" ? "es" : "en",
    publisher: {
      "@type": "Organization",
      name: "Fundación Centro Educativo de Panamá",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (data?.posts || []).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/${lang}/all/post/${post.slug.current}`,
        name: post.title,
      })),
    },
  };

  return {
    title:
      lang === "es"
        ? data?.title || "Blog de Educación Islámica | Fundación Centro Educativo de Panamá"
        : data?.title || "Islamic Education Blog | Fundación Centro Educativo de Panamá",
    description:
      lang === "es"
        ? "Explora artículos relacionados con la educación islámica, cultura y valores en nuestra Fundación."
        : "Explore articles related to Islamic education, culture, and values in our Foundation.",
    metadataBase: new URL(baseUrl),
    alternates,
    keywords: lang === "es" ? keywordsEs : keywordsEn,
    openGraph: {
      title:
        lang === "es"
          ? "Blog de Educación Islámica | Fundación Centro Educativo de Panamá"
          : "Islamic Education Blog | Fundación Centro Educativo de Panamá",
      description:
        lang === "es"
          ? "Explora artículos relacionados con la educación islámica, cultura y valores en nuestra Fundación."
          : "Explore articles related to Islamic education, culture, and values in our Foundation.",
      url: canonical,
      siteName: "Fundación Centro Educativo de Panamá",
      locale: lang === "es" ? "es_PA" : "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            lang === "es"
              ? "Blog Fundación Centro Educativo de Panamá"
              : "Fundación Centro Educativo de Panamá Blog",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/appletouchicon.png",
    },
    category: "education",
    generator: "Next.js 14 + Sanity CMS",
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}


async function getCategoryPosts(category, lang) {

  const posts = (category === "all" ? await getAllPosts(lang) : await getPostsByCategory(category, lang));
  const title = category === "all" ? "ALL" : posts[0]?.categories.filter(
    e => e.slug.current === category)[0]?.title;
  return { title, posts };
}

// export async function generateMetadata({ params }) {
//   const data = await getCategoryPosts(params.category, params.lang);
//   return { title: data.title };
// }


export default async function SearchPage({ params }) {
  const data = await getCategoryPosts(params.category, params.lang);
  const categories = await getAllCategoriesCount(params.lang)
  const { title, posts } = data;


  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <CategoryPosts internalPosts={posts} title={title} categories={categories} lang={params.lang} />
      </Container>
    </Suspense>
  );
}

// export const revalidate = 60;
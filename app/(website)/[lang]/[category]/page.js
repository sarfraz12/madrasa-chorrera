import CategoryPosts from "./categoryPosts";
import Container from "@/components/generalUse/container";
import { getAllCategories, getPostsByCategory, getAllPosts, getAllCategoriesCount } from "@/lib/sanity/client";
import { Suspense } from "react";
import  Loading from "@/app/(website)/[lang]/loading";

export async function generateStaticParams() {
  return await getAllCategories();
}

async function getCategoryPosts(category, lang) {

  const posts = (category === "all" ? await getAllPosts(lang) : await getPostsByCategory(category, lang));
  const title = category === "all" ? "ALL" : posts[0]?.categories.filter(
    e => e.slug.current === category)[0]?.title;
  return { title, posts };
}

export async function generateMetadata({ params }) {
  const data = await getCategoryPosts(params.category, params.lang);
  return { title: data.title };
}


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
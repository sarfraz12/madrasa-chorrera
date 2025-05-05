import PostPage from "./postHome";
import { Suspense } from "react";
import  Loading from "@/app/(website)/[lang]/loading";

import {
  getAllPostsSlugs,
  getPostBySlug,
  getTopCategories,
} from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug, params.lang);
  return { title: post.title };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug, params.lang);
  const categories = await getTopCategories(params.lang);

  return (
    <Suspense fallback={<Loading />}>
      <PostPage post={post} categories={categories} lang={params.lang} />
    </Suspense>

  );
}

// export const revalidate = 60;

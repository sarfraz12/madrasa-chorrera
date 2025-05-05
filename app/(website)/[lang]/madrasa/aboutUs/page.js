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

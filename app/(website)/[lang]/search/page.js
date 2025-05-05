import Search from "./search";
import { Suspense } from "react";
import  Loading from "@/app/(website)/[lang]/loading";

export async function generateStaticParams() {
  const langs = ["en", "es"]; // Add your supported languages here
  const params = langs.map(lang => ({
      lang,
  }));
  return params;
}

export default async function SearchPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <Search lang={params.lang} />
    </Suspense>

  );
}

// export const revalidate = 60;

import Container from "@/components/generalUse/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@/lib/sanity/plugins/portabletext";

export default function About({ authors, data, lang }) {

  const customComponents = {
    block: {
      normal: ({ children }) => (
        <p className="w-full text-base leading-relaxed">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="w-full text-4xl font-bold mt-8 mb-4">{children}</h1>
      ),
      blockquote: ({ children }) => (
        <blockquote className="w-full border-l-4 pl-4 italic text-gray-600">
          {children}
        </blockquote>
      ),
    },
  }

  return (
    <Container>
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
        {data?.title}
      </h1>
      <div className="text-center">
        <p className="text-lg">
          {data?.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-6 md:mt-16  md:gap-16">
        {authors.slice(1, 4).map(author => {
          const imageProps = urlForImage(author?.image) || null;
          return (
            <div
              key={author._id}
              className="relative overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-16">
              {/* <Link href={`/${lang}/search?q=${author.slug}`}> */}
              <Image
                src={imageProps.src}
                alt={author?.name || " "}
                fill
                sizes="(max-width: 320px) 100vw, 320px"
                className="object-cover"
              />
              {/* </Link> */}
            </div>
          );
        })}
      </div>

      <div className="max-w-full">
        <div className="text-justify">

          {data?.body && (
            <div className="w-full prose-lg dark:prose-invert">
              <PortableText value={data.body} components={customComponents} />
            </div>
          )}
        </div>

        <p className="text-center w-full">
          <Link href={`/${lang}/contact`}>{lang === "es" ? "Ponerse en Contacto" : "Get in touch"}</Link>
        </p>
      </div>
    </Container>
  );
}

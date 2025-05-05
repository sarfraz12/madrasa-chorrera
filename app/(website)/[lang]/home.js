"use client"
import Container from "@/components/generalUse/container";
import Carousel from "@/components/generalUse/courosel";
import PostList from "@/components/posts/postlist";
import ComparisonCard from "@/components/cards/ComparisonCard"
import ClientSlider from "@/components/sliders/client"
import CtaCard from "@/components/cards/ctaCard";
import ServiceDescription from "@/components/cards/serviceDescription"
import Link from "next/link";
import { useState } from 'react';
import { urlForImage } from "@/lib/sanity/image";


export default function Home({ posts, landingData, lang }) {
  const featuredPost = posts.filter(item => item.featured) || null;

  // State to control how many cards are displayed
  const [showAll, setShowAll] = useState(false);

  // Function to toggle between showing the first 3 and all cards
  const toggleShowAll = () => setShowAll(!showAll);

  // Determine which cards to show based on the state
  const cardsToShow = showAll ? landingData[0]?.landingServiceItems : landingData[0]?.landingServiceItems.slice(0, 3);

  console.log(landingData)
  return (
    <>
    {/* CAROUSEL */}
      <div className="@container mt-0.5">
        <Carousel images={landingData[0]?.sliders} />
      </div>

      {/* SERVICE AND HOOK SECTION  */}
      <section className="px-6 py-12 grid md:grid-cols-2 ">
        <div className="text-left max-w-3xl mx-10">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
            {landingData[0]?.landingServiceTitle && landingData[0]?.landingServiceTitle}
          </h2>
          <p className="text-gray-500 mb-8 md:text-xl text-lg">
            {landingData[0]?.landingServiceDescription && landingData[0]?.landingServiceDescription}
          </p>
          <Link href={landingData[0]?.landingServiceLink && landingData[0]?.landingServiceLink} className="text-blue-600 font-medium mb-8 inline-block text-md">
            {landingData[0]?.landingServiceLinkMessage && landingData[0]?.landingServiceLinkMessage} &rarr;
          </Link>
        </div>

        {/* Differents comparison cards In SERVICE */}
        <div className="max-w-xl mx-auto space-y-4 w-full">
          {cardsToShow && cardsToShow.map((item, index) => (
            <ComparisonCard
              key={index}
              title={item?.serviceTitle}
              category={item?.serviceCategory}
              color={item?.serviceColor}
              textColor={item?.serviceTextColor}
              link={item?.serviceLink}
            />
          ))}

          {/* "See All" or "Show Less" button */}
          <div className="text-left">
            <button
              onClick={toggleShowAll}
              className="text-blue-600 font-medium mt-4">

              {showAll ? lang == "en" ? "Show Less" : "Mostrar Menos" : lang == "en" ? 'See All Services' : "Mostrar Más"}
            </button>
          </div>
        </div>
      </section>


      <Container large>

        <ClientSlider lang={lang} dataImage={landingData[0]?.clientImages}  />

        {/* POST SECTION */}

        {featuredPost.length > 4 && (
          <div>
            <div className="flex items-center justify-center mt-10">
              <h2 className="text-2xl dark:text-white text-black ">
                <strong>{landingData[0].title}</strong>
              </h2>
            </div>
            <div className="grid gap-10 mt-10 mb-20 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 animate-staggeredBounce ">
              {featuredPost.slice(0, 1).map((post, index) =>
              (
                <div
                  className="md:col-span-2 md:row-span-2"
                  key={index}>
                  <PostList
                    post={post}
                    preloadImage={true}
                    pathPrefix="all"
                    fontSize="largÏe"
                    aspect="custom"
                    fontWeight="normal"
                    lang={lang}
                  />
                </div>
              )
              )}
              {featuredPost.slice(1, 10).map((post, index) => (
                <PostList
                  key={index}
                  post={post}
                  aspect="landscape"
                  pathPrefix="all"
                  fontWeight="normal"
                  preloadImage={true}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        )}


        {/* Latest posts */}
        <div className="flex items-center justify-center mt-4">
          <h3 className="text-2xl dark:text-white text-black ">
            <strong>{lang == "en" ? "Our" : "Los"}</strong> {lang == "en" ? "Latest" : "Últimos"}
          </h3>
        </div>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {posts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by creation date
            .slice(0, 3) // Get the last 3 posts
            .map((post, index) => (
              <PostList
                key={index}
                post={post}
                fontWeight="normal"
                pathPrefix="all"
                aspect="square"
              />
            ))}
        </div>

        {/* SECTION OF MORE SERVICE */}
        <div className="min-h-screen ">
          {landingData[0]?.ServiceCards?.map((item, index) => (
            <ServiceDescription
              key={index}
              title={item?.serviceCardTitle}
              description={item?.serviceCarddescription}
              description2={item?.serviceCarddescription2}
              imageSrc={urlForImage(item?.serviceCardImage)}
              reverse={item?.serviceCardReverse}
              points={item?.ServiceCardPoints}
              animation={item?.serviceCardAnimation}
            />

          ))}

        </div>

        <CtaCard
          title={landingData[0]?.ctaCardTitle}
          subTitle={landingData[0]?.ctaCardSubtitle}
          description={landingData[0]?.ctaCardDescription}
          buttonMessage={landingData[0]?.ctaCardButtonMessage}
          buttonLink={landingData[0]?.ctaCardButtonLink}
          imageAlt={landingData[0]?.ctaCardImageAlt}
          image={urlForImage(landingData[0]?.ctaCardImage)}
        />


      </Container>
    </>
  );
}

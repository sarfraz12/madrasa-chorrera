"use client";
import Container from "@/components/generalUse/container";
import Carousel from "@/components/generalUse/courosel";
import PostList from "@/components/posts/postlist";
import ComparisonCard from "@/components/cards/ComparisonCard";
import ClientSlider from "@/components/sliders/client";
import CtaCard from "@/components/cards/ctaCard";
import ServiceDescription from "@/components/cards/serviceDescription";
import Link from "next/link";
import { useState } from "react";
import { urlForImage } from "@/lib/sanity/image";

interface Post {
  title: string;
  slug: { current: string }; // Update slug to match the expected type
  createdAt: string;
  featured: boolean;
  excerpt?: string;
  mainImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
    alt?: string;
    blurDataURL?: string;
  };
  // Add other fields as necessary
}

interface LandingData {
  landingServiceItems: any[];
  landingServiceTitle: string;
  landingServiceDescription: string;
  landingServiceLink: string;
  landingServiceLinkMessage: string;
  sliders: any[];
  clientImages: any[];
  ServiceCards: any[];
  ctaCardTitle: string;
  ctaCardSubtitle: string;
  ctaCardDescription: string;
  ctaCardButtonMessage: string;
  ctaCardButtonLink: string;
  ctaCardImageAlt: string;
  ctaCardImage: any;
  title: string;
  // Add other fields as necessary
}

interface HomeProps {
  posts: Post[];
  landingData: LandingData[];
  lang: string;
}

const HomePage = ({ posts, landingData, lang }: HomeProps) => {
  // State to control how many cards are displayed
  const [showAll, setShowAll] = useState(false);

  // Function to toggle between showing the first 3 and all cards
  const toggleShowAll = () => setShowAll(!showAll);

  // Check if landingData is available and handle missing data gracefully
  if (!landingData || landingData.length === 0) {
    return <div>Missing landing data</div>;
  }

  // Determine which cards to show based on the state
  const cardsToShow = showAll
    ? landingData[0]?.landingServiceItems
    : landingData[0]?.landingServiceItems.slice(0, 3);

  // Fallback image URL for missing images
  const fallbackImage = "/default-image";

  const featuredPost = posts.filter((item) => item.featured) || [];

  return (
    <>
      {/* CAROUSEL */}
      <div className="@container mt-0.5">
        <Carousel images={landingData[0]?.sliders || []} />
      </div>

      {/* SERVICE AND HOOK SECTION */}
      <section className="px-6 py-12 grid md:grid-cols-2">
        <div className="text-left max-w-3xl mx-10">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
            {landingData[0]?.landingServiceTitle || "Service Title"}
          </h2>
          <p className="text-gray-500 mb-8 md:text-xl text-lg">
            {landingData[0]?.landingServiceDescription || "Service Description"}
          </p>
          <Link
            href={landingData[0]?.landingServiceLink || "#"}
            className="text-blue-600 font-medium mb-8 inline-block text-md"
          >
            {landingData[0]?.landingServiceLinkMessage || "Learn More"} &rarr;
          </Link>
        </div>

        {/* Differents comparison cards In SERVICE */}
        <div className="max-w-xl mx-auto space-y-4 w-full">
          {cardsToShow &&
            cardsToShow.map((item: any, index: number) => (
              <ComparisonCard
                key={index}
                title={item?.serviceTitle || "Service Title"}
                category={item?.serviceCategory || "Category"}
                color={item?.serviceColor || "default-color"}
                textColor={item?.serviceTextColor || "text-color"}
                link={item?.serviceLink || "#"}
              />
            ))}

          {/* "See All" or "Show Less" button */}
          <div className="text-left">
            <button
              onClick={toggleShowAll}
              className="text-blue-600 font-medium mt-4"
              aria-expanded={showAll ? "true" : "false"}
            >
              {showAll
                ? lang === "en"
                  ? "Show Less"
                  : "Mostrar Menos"
                : lang === "en"
                  ? "See All Services"
                  : "Mostrar Más"}
            </button>
          </div>
        </div>
      </section>

      <Container large>
        {/* <ClientSlider
          lang={lang}
          dataImage={landingData[0]?.clientImages || []}
        /> */}



        {/* Latest posts */}
        {/* <div className="flex items-center justify-center mt-4">
          <h3 className="text-2xl dark:text-white text-black">
            <strong>{lang === "en" ? "Our" : "Los"}</strong>{" "}
            {lang === "en" ? "Latest" : "Últimos"}
          </h3>
        </div>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3">
          {posts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ) // Sort by creation date
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
        </div> */}

        {/* SECTION OF MORE SERVICE */}
        <div className="min-h-screen">
          {landingData[0]?.ServiceCards?.map((item: any, index: number) => (
            <ServiceDescription
              key={index}
              title={item?.serviceCardTitle || "Service Title"}
              description={item?.serviceCarddescription || "Description"}
              description2={item?.serviceCarddescription2 || "Additional Description"}
              imageSrc={urlForImage(item?.serviceCardImage) || fallbackImage}
              reverse={item?.serviceCardReverse || false}
              points={item?.ServiceCardPoints || []}
              animation={item?.serviceCardAnimation || ""}
            />
          ))}
        </div>

        <CtaCard
          title={landingData[0]?.ctaCardTitle || "Call to Action Title"}
          subTitle={landingData[0]?.ctaCardSubtitle || "Subtitle"}
          description={landingData[0]?.ctaCardDescription || "Description"}
          buttonMessage={landingData[0]?.ctaCardButtonMessage || "Click Here"}
          buttonLink={landingData[0]?.ctaCardButtonLink || "#"}
          imageAlt={landingData[0]?.ctaCardImageAlt || "CTA Image"}
          image={urlForImage(landingData[0]?.ctaCardImage) || fallbackImage}
        />

        {/* POST SECTION */}
        {featuredPost.length > 0 && (
          <div>
            <div className="flex items-center justify-center mt-10">
              <h2 className="text-2xl dark:text-white text-black">
                <strong>{landingData[0]?.title || "Featured Posts"}</strong>
              </h2>
            </div>
            <div className="grid gap-10 mt-10 mb-20 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 animate-staggeredBounce">
              {featuredPost.slice(0, 1).map((post, index) => (
                <div className="md:col-span-2 md:row-span-2" key={index}>
                  <PostList
                    post={post}
                    preloadImage={true}
                    pathPrefix="all"
                    fontSize="large"
                    aspect="custom"
                    fontWeight="normal"
                    lang={lang}
                  />
                </div>
              ))}
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
      </Container>
    </>
  );
}

export default HomePage;

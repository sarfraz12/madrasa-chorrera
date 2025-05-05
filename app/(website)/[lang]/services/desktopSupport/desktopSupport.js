import Featured from "@/components/sliders/featured";
import Container from "@/components/generalUse/container";
import CardIcon from "@/components/cards/cardIcon";
import CtaCard from "@/components/cards/ctaCard";
import ServiceDescription from "@/components/cards/serviceDescription"
import DetailsCard from "@/components/cards/detailsCard"
import { notFound } from "next/navigation";
import { urlForImage } from "@/lib/sanity/image";


export default function DesktopSupport(props) {
  
  const { data, post, lang } = props  

  if (!data) {
    notFound();
  }

  return (
    <>
      {post &&
        <Featured pathPrefix="all" post={post} />
      }


      <Container large>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug 
        dark:text-white text-black  text-brand-primary lg:text-4xl">
          {data?.title}
        </h1>
        <div className="text-center dark:text-white text-black ">
          <p className="text-lg">{data?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-2 mt-4">
          {data?.keyActivities && data?.keyActivities.map((item, index) =>
          (
            <CardIcon data={item} key={index} lang={lang} />
          )
          )}
        </div>

        {/* SECTION OF MORE SERVICE */}
        <div className="min-h-screen">
          {data?.ServiceCards?.map((item, index) => (
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
          title={data?.ctaCardTitle}
          subTitle={data?.ctaCardSubtitle}
          description={data?.ctaCardDescription}
          buttonMessage={data?.ctaCardButtonMessage}
          buttonLink={data?.ctaCardButtonLink}
          imageAlt={data?.ctaCardImageAlt}
          image={urlForImage(data?.ctaCardImage)}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.DestopPageCards?.map((card, index) => (

            <DetailsCard
              key={index}
              title={card?.DestopPageCardsTitle}
              description={card?.DestopPageCardsDescription}
              imageSrc={urlForImage(card?.DestopPageImage)}
              imageAlt={card?.DestopPageCardsImageAlt}
              subcontent={card?.DestopPageCardsSubContent}
              hasImage={card?.DestopPageCardsHasImage}
              size={card?.DestopPageCardsSize}
              hasButton={card?.DestopPageCardsHasButton}
              span={card?.DestopPageCardsSpan} // Apply span (horizontal or vertical)
              animation={card?.serviceCardAnimation}
            />

          ))}
        </div>


      </Container>
    </>
  )
}


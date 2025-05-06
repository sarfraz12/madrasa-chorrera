import Featured from "@/components/sliders/featured";
import Container from "@/components/generalUse/container";
import CardIcon from "@/components/cards/cardIcon";
import CtaCard from "@/components/cards/ctaCard";
import ServiceDescription from "@/components/cards/serviceDescription"
import DetailsCard from "@/components/cards/detailsCard"
import { notFound } from "next/navigation";
import { urlForImage } from "@/lib/sanity/image";


export default function SchoolCurriculumPage(props) {

  const { data, post, lang } = props || {};

  if (!data) {
    notFound();
  }

  const itemCount = data?.keyActivities?.length || 1;
  const columnCount = Math.min(Math.max(itemCount, 1), 3);

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


        <div className={`grid grid-cols-1 md:grid-cols-${columnCount} md:gap-4 gap-2 mt-4`}>
          {data?.keyActivities && data?.keyActivities.map((item, index) =>
          (
            <CardIcon data={item} key={index} lang={lang} />
          )
          )}
        </div>

        {/* SECTION OF MORE SERVICE */}
        <div className="min-h-screen">
          {data?.contentCards?.map((item, index) => (
            <ServiceDescription
              key={index}
              title={item?.contentCardTitle}
              description={item?.contentCardDescription}
              description2={item?.contentCardDescription2}
              imageSrc={urlForImage(item?.contentCardImage)}
              reverse={item?.contentCardReverse}
              points={item?.contentCardPoints}
              animation={item?.contentCardAnimation}
            // alt is asigned that to be equal to title.
            />

          ))}

        </div>

        {data?.ctaContentCards?.map((item, index) => (
          <CtaCard
            key={index}
            title={item?.ctaCardTitle}
            subTitle={item?.ctaCardSubtitle}
            description={item?.ctaCardDescription}
            buttonMessage={item?.ctaCardButtonMessage}
            buttonLink={item?.ctaCardButtonLink}
            imageAlt={item?.ctaCardImageAlt}
            image={urlForImage(item?.ctaCardImage)}
          />
        ))}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.galleryContent?.map((card, index) => (

            <DetailsCard
              key={index}
              title={card?.galleryTitle}
              description={card?.galleryDescription}
              imageSrc={urlForImage(card?.galleryImage)}
              imageAlt={card?.galleryImageAlt}
              subcontent={card?.gallerySubContent}
              hasImage={card?.galleryHasImage}
              size={card?.gallerySize}
              hasButton={card?.galleryHasButton}
              span={card?.gallerySpan} // Apply span (horizontal or vertical)
              animation={card?.galleryAnimation}
            />

          ))}
        </div>


      </Container>
    </>
  )
}


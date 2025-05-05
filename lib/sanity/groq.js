import { groq } from "next-sanity";

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  "excerpt": excerpt[$lang],
  slug,
  "title": title[$lang],
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    ...,
    "title": title[$lang]
  },
}
`;
// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;
// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// body[]{
//   ...,
//   markDefs[]{
//     ...,
//     _type == "internalLink" => {
//       "slug": @.reference->slug
//     }
//   }
// },

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  "title": title[$lang],
  "excerpt": excerpt[$lang],
  "body": body[$lang][]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->,
  categories[]->{
    ...,
    "title": title[$lang]
  },
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    "title":title[$lang],
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->{
    ...,
    "title": title[$lang]
  },
}
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  "title": title[$lang],
  "excerpt": excerpt[$lang],
  author->,
  categories[]->{
    ...,
    "title": title[$lang]
    },
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "title": title[$lang],
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`
  *[_type == "post" && _score > 0]
  | score(
    title[$lang] match "*"+$query+"*" || 
    excerpt[$lang] match "*"+$query+"*" || 
    pt::text(body[$lang]) match "*"+$query+"*"
  )
  | order(_score desc)
  {
    _score,
    _id,
    _createdAt,
    mainImage,
    author->,
    categories[]->{
      ...,
      "title": title[$lang]
    },
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    slug
  }
`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// Get all Landing Data2
export const landingdataallquery2 = groq`
*[_type == "landingPage2"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "sliders": sliders[]{
    ...,
    "sliderTitle": sliderTitle[$lang],
    "sliderDescription": sliderDescription[$lang]
  },
  "landingServiceTitle": landingServiceTitle[$lang],
  "landingServiceDescription": landingServiceDescription[$lang],
  "landingServiceLinkMessage": landingServiceLinkMessage[$lang],
  "landingServiceItems": landingServiceItems[]{
    ...,
    "serviceTitle": serviceTitle[$lang],
    "serviceCategory": serviceCategory[$lang],
  },
  "ServiceCards": ServiceCards[]{
    ...,
    "serviceCardTitle": serviceCardTitle[$lang],
    "serviceCarddescription": serviceCarddescription[$lang],
    "serviceCarddescription2": serviceCarddescription2[$lang],
    "serviceCardImageAlt": serviceCardImageAlt[$lang],
    "ServiceCardPoints": ServiceCardPoints[]{
      ...,
      "ServiceCardItemDescription": ServiceCardItemDescription[$lang]
    }
  },
  "ctaCardTitle": ctaCardTitle[$lang],
  "ctaCardSubtitle": ctaCardSubtitle[$lang],
  "ctaCardDescription": ctaCardDescription[$lang],
  "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
  "ctaCardImageAlt": ctaCardImageAlt[$lang],

}
`;


// Get all desktopSupport Page
export const alldesktopSupportpagequery = groq`
*[_type == "desktopSupport"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang]
  },
  "ServiceCards": ServiceCards[]{
    ...,
    "serviceCardTitle": serviceCardTitle[$lang],
    "serviceCarddescription": serviceCarddescription[$lang],
    "serviceCarddescription2": serviceCarddescription2[$lang],
    "serviceCardImageAlt": serviceCardImageAlt[$lang],
    "ServiceCardPoints": ServiceCardPoints[]{
      ...,
      "ServiceCardItemDescription": ServiceCardItemDescription[$lang]
    }
  },
  "DestopPageCards": DestopPageCards[]{
    ...,
    "DestopPageCardsTitle": DestopPageCardsTitle[$lang],
    "DestopPageCardsDescription": DestopPageCardsDescription[$lang],
    "DestopPageCardsImageAlt": DestopPageCardsImageAlt[$lang],
    "DestopPageCardsSubContent": DestopPageCardsSubContent[$lang],
  },
  "ctaCardTitle": ctaCardTitle[$lang],
  "ctaCardSubtitle": ctaCardSubtitle[$lang],
  "ctaCardDescription": ctaCardDescription[$lang],
  "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
  "ctaCardImageAlt": ctaCardImageAlt[$lang],
}
`;

// Paths for searchbyid
export const idquery = groq`
*[_type == "post" && _id == $postId][0] {
  ...,
  _id,
  "title": title[$lang],
  "excerpt": excerpt[$lang],
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`;

// Paths for Category searchbyid
export const categoryidquery = groq`
*[_type == "category" && _id == $categoryId][0] {
  "slug": slug.current,
}
`;

// Get all categories
export const allcatquery = groq`*[_type == "category"] {
  ...,
  "title": title[$lang],
  "count": count(*[_type == "post" && references(^._id)])
} `;

// Get all About Us Page
export const allaboutpagequery = groq`
*[_type == "aboutPage"] {
   ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "body": body[$lang]
}
`;

// Get all Navbar Data
export const allnavbarquery = groq`
*[_type == "navbarData"] {
   ...,
  "slug": slug.current,
  "label": label[$lang],
  "children": children[]{
    ...,
    "title": title[$lang],
  }
}
`;

// Get all Footer Data
export const allfooterquery = groq`
*[_type == "footerData"] {
   ...,
  "slug": slug.current,
  "title": title[$lang],
  "children": children[]{
    ...,
    "title": title[$lang],
  }
}
`;

// Get all islamicCurriculum Page
export const islamicCurriculumPage = groq`
*[_type == "islamicCurriculumPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;

// Get all schoolCurriculum Page
export const schoolCurriculumPage = groq`
*[_type == "schoolCurriculumPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;

// Get all schoolCalendar Page
export const schoolCalendarPage = groq`
*[_type == "schoolCalendarPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;

// Get all donationsPage Page
export const donationsPage = groq`
*[_type == "donationsPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;

// Get all welcomePage Page
export const welcomeContentPage = groq`
*[_type == "welcomeContentPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;

// Get all admissionProcessPage Page
export const admissionProcessPage = groq`
*[_type == "admissionProcessPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;

// Get all admissionForms Page
export const admissionFormsPage = groq`
*[_type == "admissionFormsPage"] {
  ...,
  "slug": slug.current,
  "title": title[$lang],
  "description": description[$lang],
  "keyActivities": keyActivities[]{
    ...,
    "title": title[$lang],
    "description": description[$lang],
    "attachmentUrl": attachment.asset->url

  },
  "contentCards": contentCards[]{
    ...,
    "contentCardTitle": contentCardTitle[$lang],
    "contentCardDescription": contentCardDescription[$lang],
    "contentCardDescription2": contentCardDescription2[$lang],
    "contentCardImageAlt": contentCardImageAlt[$lang],
    "contentCardPoints": contentCardPoints[]{
      ...,
      "contentCardItemDescription": contentCardItemDescription[$lang]
    }
  },
  "galleryContent": galleryContent[]{
    ...,
    "galleryTitle": galleryTitle[$lang],
    "galleryDescription": galleryDescription[$lang],
    "galleryImageAlt": galleryImageAlt[$lang],
    "gallerySubContent": gallerySubContent[$lang],
  },
  "ctaContentCards": ctaContentCards[]{
    ...,
    "ctaCardTitle": ctaCardTitle[$lang],
    "ctaCardSubtitle": ctaCardSubtitle[$lang],
    "ctaCardDescription": ctaCardDescription[$lang],
    "ctaCardButtonMessage": ctaCardButtonMessage[$lang],
    "ctaCardImageAlt": ctaCardImageAlt[$lang],
  },
}
`;
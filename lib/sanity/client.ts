import { apiVersion, dataset, projectId, tokenId, useCdn } from "./config";
import {
  idquery,
  landingdataallquery2,
  postquery,
  paginatedquery,
  configQuery,
  singlequery,
  pathquery,
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  postsbycatquery,
  catpathquery,
  catquery,
  allcatquery,
  allaboutpagequery,
  categoryidquery,
  allnavbarquery,
  allfooterquery,
  islamicCurriculumPage,
  schoolCurriculumPage,
  schoolCalendarPage,
  donationsPage,
  welcomeContentPage,
  admissionFormsPage,
  admissionProcessPage,
} from "./groq";
import {createClient } from "next-sanity";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export const fetcher = async ([query, params]: any) => {
  return client ? client.fetch(query, params) : [];
};

export async function getAllPosts(lang: string) {
  if (client) {
    return (await client.fetch(postquery, {lang})) || [];
  }
  return [];
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery)) || [];
  }
  return [];
}

export async function getPostBySlug(slug: string, lang: string) {
  if (client) {
    return (await client.fetch(singlequery, { slug, lang })) || {};
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || [];
    return slugs.map((slug:any) => ({ slug }));
  }
  return [];
}
// Author
export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs = (await client.fetch(authorsquery)) || [];
    return slugs.map((slug:any) => ({ author: slug }));
  }
  return [];
}

export async function getAuthorPostsBySlug(slug: string, lang: string) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug, lang })) || {};
  }
  return {};
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || [];
  }
  return [];
}

// Category

export async function getAllCategories() {
  if (client) {
    const slugs = (await client.fetch(catpathquery)) || [];
    return slugs.map((slug:any) => ({ category: slug }));
  }
  return [];
}

export async function getPostsByCategory(slug: string, lang: string) {
  if (client) {
    return (await client.fetch(postsbycatquery, { slug, lang })) || {};
  }
  return {};
}

export async function getTopCategories(lang: string) {
  if (client) {
    return (await client.fetch(catquery, {lang})) || [];
  }
  return [];
}

export async function getPaginatedPosts(limit: any) {
  if (client) {
    return (
      (await client.fetch(paginatedquery, {
        pageIndex: 0,
        limit: limit
      })) || {}
    );
  }
  return {};
}

export async function getLandingData2(lang: string) {
  if (client) {
    return (await client.fetch(landingdataallquery2, {lang})) || [];
  }
  return [];

}

export async function getPostById(postId: string, lang: string) {
  if (client) {
    return (await client.fetch(idquery, { postId, lang })) || {};
  }
  return {};
}

export async function getCategoriesById(categoryId: string) {
  if (client) {
    return (await client.fetch(categoryidquery, { categoryId })) || {};
  }
  return {};
}

export async function getAllCategoriesCount(lang: string) {
  if (client) {
    return (await client.fetch(allcatquery, {lang})) || [];
  }
  return [];
}

export async function getAboutPage(lang: string) {
  if (client) {
    return (await client.fetch(allaboutpagequery, {lang})) || [];
  }
  return [];
};

export async function getNavbarData(lang: string) {
  if (client) {
    return (await client.fetch(allnavbarquery, {lang})) || [];
  }
  return [];
};


export async function getFooterData(lang: string) {
  if (client) {
    return (await client.fetch(allfooterquery, {lang})) || [];
  }
  return [];
};

// Islamic Curriculim Page content
export async function getIslamicCurriculumPage(lang: string) {
  if (client) {
    return (await client.fetch(islamicCurriculumPage, {lang})) || [];
  }
  return [];
}

// School Curriculim Page content
export async function getSchoolCurriculumPage(lang: string) {
  if (client) {
    return (await client.fetch(schoolCurriculumPage, {lang})) || [];
  }
  return [];
}

// School Calendar Page content
export async function getSchoolCalendarPage(lang: string) {
  if (client) {
    return (await client.fetch(schoolCalendarPage, {lang})) || [];
  }
  return [];
}

// School Donations Page content
export async function getDonationsPage(lang: string) {
  if (client) {
    return (await client.fetch(donationsPage, {lang})) || [];
  }
  return [];
}

// School Welcome Page content
export async function getWelcomeContentPage(lang: string) {
  if (client) {
    return (await client.fetch(welcomeContentPage, {lang})) || [];
  }
  return [];
}


// School Admission Process Page content
export async function getAdmissionProcessPage(lang: string) {
  if (client) {
    return (await client.fetch(admissionProcessPage, {lang})) || [];
  }
  return [];
}


// School Admission Forms Page content
export async function getAdmissionFormsPage(lang: string) {
  if (client) {
    return (await client.fetch(admissionFormsPage, {lang})) || [];
  }
  return [];
}



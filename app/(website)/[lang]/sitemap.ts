
import { getAllPostsSlugs, getAllCategories } from '@/lib/sanity/client';
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string

    // Get Posts
    const posts = await getAllPostsSlugs();

    const postLinks = posts?.map(({post}:{post:{slug: string, date_updated: string}}) => {
        return[
            {
                url: `${baseURL}/en/all/post/${post.slug}`,
                lastModified: new Date(post.date_updated)
            },
            {
                url: `${baseURL}/es/all/post/${post.slug}`,
                lastModified: new Date(post.date_updated)
            },
            {
                url: `${baseURL}/all/post/${post.slug}`,
                lastModified: new Date(post.date_updated)
            }
        ]
    })
    // Get Categories
    const categories = await getAllCategories()

    const categoryLinks = categories?.map(({category}: {category:{slug: string}}) => {
        return [
            {
                url: `${baseURL}/en/${category.slug}`,
                lastModified: new Date()
            },
            {
                url: `${baseURL}/es/${category.slug}`,
                lastModified: new Date()
            },
            {
                url: `${baseURL}/${category.slug}`,
                lastModified: new Date()
            }
        ]
    })

    const dynamicLinks = postLinks?.concat(categoryLinks ?? []).flat() ?? []

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/en/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/es/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
        url: `${baseURL}/es/services/desktopSupport`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseURL}/en/services/desktopSupport`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseURL}/es/services`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseURL}/en/services`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
    ...dynamicLinks,
  ]
}
import rss from '@astrojs/rss'
import { RSS_SITE_NAME } from '@lib/common/constants'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async (context) => {
  // Only include published posts (exclude drafts) in RSS feed
  const posts = await getCollection('posts', ({ data }) => {
    return data.draft !== true
  })
  // latest to earliest Date descending
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.published).getTime() -
      new Date(a.data.published).getTime()
  )
  return rss({
    stylesheet: '/rss/rss.xsl',
    // `<title>` field in output xml
    title: RSS_SITE_NAME,
    // `<description>` field in output xml
    description: 'Developer Portfolio and Blog by Alexander Torrijos',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: sortedPosts.map((post) => ({
      // `<title>` field in individual `<item>`s
      title: post.data.title,
      // `<link>` field in individual `<item>`s
      link: new URL(post.slug, context.site).href,
      // `<description>` field in individual `<item>`s
      description: post.data.description,
      // `<pubDate>` field in individual `<item>`s
      pubDate: new Date(post.data.published),
      // (optional) `<category>` field in individual `<item>`s
      category: post.data.tags[0],
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  })
}

// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

// 2. Define your collection(s)
const skillsCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      skill: z.string(),
      proficiency: z.string(),
      label: z.string(),
      logo: image(),
      order: z.number(),
    }),
})

const postSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  author: z.string(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  tags: z.array(z.string()),
})

const postsCollection = defineCollection({
  type: 'content',
  schema: postSchema,
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  skills: skillsCollection,
  posts: postsCollection,
}

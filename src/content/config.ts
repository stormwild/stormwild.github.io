// 1. Import utilities from `astro:content`
import { postSchema, skillsSchema } from '@lib/schemas'
import { defineCollection } from 'astro:content'

// 2. Define your collection(s)
const skillsCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: skillsSchema,
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

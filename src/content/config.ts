import { z, defineCollection } from 'astro:content'

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = {
  pages: pagesCollection,
}

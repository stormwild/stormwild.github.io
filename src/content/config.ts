import { z, defineCollection } from 'astro:content'

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    meta: z
      .object({
        description: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
  }),
})

export const collections = {
  pages: pagesCollection,
}

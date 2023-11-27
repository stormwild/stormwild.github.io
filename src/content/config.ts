import { z, defineCollection } from 'astro:content'

const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    skill: z.string(),
    proficiency: z.number(),
    label: z.string(),
    logo: z.string(),
  }),
})

export const collections = {
  'skills': skillsCollection,
}

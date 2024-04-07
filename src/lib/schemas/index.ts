import { z, type ImageFunction } from 'astro:content'

export const postSchema = z.object({
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

export const skillsSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    skill: z.string(),
    proficiency: z.string(),
    label: z.string(),
    logo: image(),
    order: z.number(),
  })

import { z, type ImageFunction } from 'astro:content'

export interface SchemaProps {
  image: ImageFunction
}

export const postSchema = ({ image }: SchemaProps) =>
  z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    description: z.string(),
    image: image(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  })

export const skillsSchema = ({ image }: SchemaProps) =>
  z.object({
    skill: z.string(),
    proficiency: z.string(),
    label: z.string(),
    logo: image(),
    order: z.number(),
  })

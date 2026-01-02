import { z, type ImageFunction } from 'astro:content'
import { categoryExists } from '@lib/categories/taxonomy'

export interface SchemaProps {
  image: ImageFunction
}

/**
 * Category slug validator
 * Ensures the category slug exists in the taxonomy
 */
const validateCategorySlug = z.string().refine(
  (slug) => categoryExists(slug),
  (slug) => ({
    message: `Category "${slug}" does not exist in taxonomy. Add it to src/lib/categories/taxonomy.ts first.`,
  })
)

export const postSchema = ({ image }: SchemaProps) =>
  z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    description: z.string(),
    image: image(),
    tags: z.array(z.string()),
    category: validateCategorySlug.optional(), // Primary category (validated slug/ID)
    categories: z.array(validateCategorySlug).optional(), // All categories (validated slugs/IDs)
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

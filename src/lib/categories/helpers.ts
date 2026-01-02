/**
 * Category helpers for working with category references
 * Categories are stored as slugs (IDs) in post frontmatter and resolved to full data
 */

import type { CollectionEntry } from 'astro:content'
import { getCategory, getCategoryBreadcrumbs, type CategoryNode } from './taxonomy'

/**
 * Get the primary category for a post
 * Returns the full CategoryNode, not just the slug
 */
export function getPrimaryCategory(
  post: CollectionEntry<'posts'>
): CategoryNode | undefined {
  const categorySlug = post.data.category
  if (!categorySlug) return undefined
  return getCategory(categorySlug)
}

/**
 * Get all categories for a post
 * Returns full CategoryNode objects, not just slugs
 */
export function getPostCategories(post: CollectionEntry<'posts'>): CategoryNode[] {
  const categorySlugs = post.data.categories ?? []
  return categorySlugs
    .map((slug) => getCategory(slug))
    .filter((cat): cat is CategoryNode => cat !== undefined)
}

/**
 * Get breadcrumb path for post's primary category
 */
export function getPostCategoryBreadcrumbs(
  post: CollectionEntry<'posts'>
): CategoryNode[] {
  const categorySlug = post.data.category
  if (!categorySlug) return []
  return getCategoryBreadcrumbs(categorySlug)
}

/**
 * Check if a post belongs to a specific category (by slug)
 */
export function postHasCategory(
  post: CollectionEntry<'posts'>,
  categorySlug: string
): boolean {
  if (post.data.category === categorySlug) return true
  return post.data.categories?.includes(categorySlug) ?? false
}

/**
 * Get all posts in a specific category
 */
export function getPostsByCategory(
  posts: CollectionEntry<'posts'>[],
  categorySlug: string
): CollectionEntry<'posts'>[] {
  return posts.filter((post) => postHasCategory(post, categorySlug))
}

/**
 * Get category display name from slug
 * Useful for showing category names in UI
 */
export function getCategoryName(slug: string): string {
  const category = getCategory(slug)
  return category?.name ?? slug
}

/**
 * Type guard: Check if post has categories assigned
 */
export function postHasCategories(
  post: CollectionEntry<'posts'>
): post is CollectionEntry<'posts'> & {
  data: { categories: string[] }
} {
  return (post.data.categories?.length ?? 0) > 0
}

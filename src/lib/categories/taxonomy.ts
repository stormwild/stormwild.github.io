/**
 * Category taxonomy configuration
 * Defines the hierarchical structure of blog categories (WordPress-style)
 */

export interface CategoryNode {
  name: string
  slug: string
  description?: string
  parent?: string // Slug of parent category
  children?: string[] // Slugs of child categories
}

export type CategoryTaxonomy = Record<string, CategoryNode>

/**
 * Category hierarchy definition
 * Add or remove categories here to manage your blog's taxonomy
 */
export const categoryTaxonomy: CategoryTaxonomy = {
  // Development
  'web-development': {
    name: 'Web Development',
    slug: 'web-development',
    description: 'Web development topics and tutorials',
    children: ['frontend', 'backend'],
  },
  frontend: {
    name: 'Frontend',
    slug: 'frontend',
    parent: 'web-development',
    description: 'Frontend development topics',
  },
  backend: {
    name: 'Backend',
    slug: 'backend',
    parent: 'web-development',
    description: 'Backend development topics',
  },

  // Software Architecture
  'software-architecture': {
    name: 'Software Architecture',
    slug: 'software-architecture',
    description: 'Software architecture patterns and best practices',
    children: ['design-patterns', 'clean-code'],
  },
  'design-patterns': {
    name: 'Design Patterns',
    slug: 'design-patterns',
    parent: 'software-architecture',
  },
  'clean-code': {
    name: 'Clean Code',
    slug: 'clean-code',
    parent: 'software-architecture',
  },

  // DevOps & Infrastructure
  devops: {
    name: 'DevOps',
    slug: 'devops',
    description: 'DevOps practices and tools',
    children: ['containers', 'ci-cd', 'cloud'],
  },
  containers: {
    name: 'Containers',
    slug: 'containers',
    parent: 'devops',
    description: 'Docker, Kubernetes, and containerization',
  },
  'ci-cd': {
    name: 'CI/CD',
    slug: 'ci-cd',
    parent: 'devops',
    description: 'Continuous Integration and Deployment',
  },
  cloud: {
    name: 'Cloud Computing',
    slug: 'cloud',
    parent: 'devops',
    description: 'AWS, Azure, GCP, and cloud services',
  },

  // Programming Languages
  'programming-languages': {
    name: 'Programming Languages',
    slug: 'programming-languages',
    children: ['dotnet', 'javascript', 'typescript', 'php', 'python'],
  },
  dotnet: {
    name: '.NET',
    slug: 'dotnet',
    parent: 'programming-languages',
  },
  javascript: {
    name: 'JavaScript',
    slug: 'javascript',
    parent: 'programming-languages',
  },
  typescript: {
    name: 'TypeScript',
    slug: 'typescript',
    parent: 'programming-languages',
  },
  php: {
    name: 'PHP',
    slug: 'php',
    parent: 'programming-languages',
  },
  python: {
    name: 'Python',
    slug: 'python',
    parent: 'programming-languages',
  },

  // Tools
  'development-tools': {
    name: 'Development Tools',
    slug: 'development-tools',
    children: ['version-control', 'editors', 'build-tools'],
  },
  'version-control': {
    name: 'Version Control',
    slug: 'version-control',
    parent: 'development-tools',
  },
  editors: {
    name: 'Editors & IDEs',
    slug: 'editors',
    parent: 'development-tools',
  },
  'build-tools': {
    name: 'Build Tools',
    slug: 'build-tools',
    parent: 'development-tools',
  },

  // Networking
  networking: {
    name: 'Networking',
    slug: 'networking',
    description: 'Computer networking fundamentals and protocols',
  },

  // Education & Learning
  education: {
    name: 'Education',
    slug: 'education',
    description: 'Educational content and tutorials',
  },

  // Other/Uncategorized
  other: {
    name: 'Other',
    slug: 'other',
    description: 'Miscellaneous topics',
  },
}

/**
 * Get category by slug
 */
export function getCategory(slug: string): CategoryNode | undefined {
  return categoryTaxonomy[slug]
}

/**
 * Get all root categories (categories without parents)
 */
export function getRootCategories(): CategoryNode[] {
  return Object.values(categoryTaxonomy).filter((cat) => !cat.parent)
}

/**
 * Get children of a category
 */
export function getChildCategories(slug: string): CategoryNode[] {
  const category = getCategory(slug)
  if (!category?.children) return []

  return category.children
    .map((childSlug) => getCategory(childSlug))
    .filter((cat): cat is CategoryNode => cat !== undefined)
}

/**
 * Get breadcrumb path for a category (from root to current)
 */
export function getCategoryBreadcrumbs(slug: string): CategoryNode[] {
  const breadcrumbs: CategoryNode[] = []
  let currentSlug: string | undefined = slug

  while (currentSlug) {
    const category = getCategory(currentSlug)
    if (!category) break

    breadcrumbs.unshift(category)
    currentSlug = category.parent
  }

  return breadcrumbs
}

/**
 * Get all categories in a flat array
 */
export function getAllCategories(): CategoryNode[] {
  return Object.values(categoryTaxonomy)
}

/**
 * Check if a category exists
 */
export function categoryExists(slug: string): boolean {
  return slug in categoryTaxonomy
}

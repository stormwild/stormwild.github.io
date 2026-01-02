# Blog Categories Guide

This guide explains how to use the WordPress-style hierarchical category system in your Astro blog.

## Features

✅ **Multiple categories per post** - Assign multiple categories to a single post
✅ **Primary category** - Designate one category as the main category (used in breadcrumbs)
✅ **Hierarchical taxonomy** - Categories can have parent-child relationships
✅ **Easy to manage** - Simply edit `src/lib/categories/taxonomy.ts` to add/remove categories
✅ **Automatic navigation** - Breadcrumbs and category trees are automatically generated

## How to Add Categories to a Post

In your post's frontmatter (the section between `---` at the top), add:

```yaml
---
title: 'Your Post Title'
published: 2025-01-01
description: 'Post description'
image: '@assets/posts/your-image.png'
tags: ["tag1", "tag2"]
category: "primary-category-slug"  # Primary category (required)
categories: ["primary-category-slug", "other-category-slug"]  # All categories (optional)
---
```

### Example

```yaml
---
title: 'Building a REST API with .NET'
published: 2025-01-01
description: 'Learn how to build a REST API using .NET'
image: '@assets/posts/dotnet-api.png'
tags: ["API", "REST", "Web Services"]
category: "dotnet"  # Primary category
categories: ["dotnet", "backend", "web-development"]  # All categories
---
```

## How to Add/Remove Categories

Edit `/src/lib/categories/taxonomy.ts`:

### Adding a New Root Category

```typescript
export const categoryTaxonomy: CategoryTaxonomy = {
  // ... existing categories

  'my-new-category': {
    name: 'My New Category',
    slug: 'my-new-category',
    description: 'Description of your category',
    children: ['subcategory-1', 'subcategory-2'], // Optional
  },
}
```

### Adding a Subcategory

```typescript
export const categoryTaxonomy: CategoryTaxonomy = {
  // Parent category
  'web-development': {
    name: 'Web Development',
    slug: 'web-development',
    children: ['frontend', 'backend', 'my-new-subcategory'], // Add here
  },

  // New subcategory
  'my-new-subcategory': {
    name: 'My New Subcategory',
    slug: 'my-new-subcategory',
    parent: 'web-development', // Link to parent
  },
}
```

### Removing a Category

1. Remove the category definition from `categoryTaxonomy`
2. Remove references from any `children` arrays
3. Update posts that use this category

## Category Structure

Current categories are organized as:

```
Web Development
├── Frontend
└── Backend

Software Architecture
├── Design Patterns
└── Clean Code

DevOps
├── Containers
├── CI/CD
└── Cloud Computing

Programming Languages
├── .NET
├── JavaScript
├── TypeScript
├── PHP
└── Python

Development Tools
├── Version Control
├── Editors & IDEs
└── Build Tools

Networking
Education
Other
```

## Category Pages

The system automatically generates:

- **Category Index** (`/blog/categories/`) - Shows all root categories with post counts
- **Individual Category Pages** (`/blog/categories/[slug]/`) - Shows posts in that category
- **Breadcrumbs** - Shows the category hierarchy path
- **Subcategory Navigation** - Links to child categories

## Best Practices

1. **Use descriptive category names** - Make it easy for readers to understand
2. **Keep hierarchy shallow** - 2-3 levels maximum for better UX
3. **Assign primary category thoughtfully** - It's used in URLs and breadcrumbs
4. **Use categories for broad topics** - Use tags for specific keywords
5. **Consistent slugs** - Use lowercase with hyphens (e.g., `web-development`)

## Difference Between Categories and Tags

- **Categories**: Hierarchical, broad topics, limited per post
- **Tags**: Flat, specific keywords, unlimited per post

Example:
- Category: `web-development` → `frontend`
- Tags: `React`, `TypeScript`, `Hooks`, `Components`

## URLs

Category pages use this URL structure:

- All categories: `/blog/categories/`
- Specific category: `/blog/categories/[slug]/`
- Example: `/blog/categories/dotnet/`

## Navigation

The category system provides:

1. **Breadcrumbs** - Shows hierarchy path (e.g., `Categories > Programming Languages > .NET`)
2. **Parent navigation** - Link back to parent category
3. **Child navigation** - Links to subcategories
4. **Post count** - Shows number of posts per category

## Troubleshooting

### Category not showing up?

1. Make sure it's defined in `src/lib/categories/taxonomy.ts`
2. Run `pnpm run build` to regenerate pages
3. Check that the slug matches exactly

### Posts not appearing in category?

1. Verify the category slug in post frontmatter matches taxonomy
2. Check that `category` or `categories` field is set
3. Rebuild the site with `pnpm run build`

## Future Enhancements

Potential additions:
- Category archive pages
- Category-based RSS feeds
- Category widgets in sidebar
- Related posts by category
- Category-specific styling

---

For questions or issues, check the documentation or open an issue on GitHub.

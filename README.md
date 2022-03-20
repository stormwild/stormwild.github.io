# stormwild.github.io

Website of Alexander R. Torrijos

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/stormwild/stormwild.github.io)

## NextJs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notes

[Using MDX with Next.js](https://nextjs.org/docs/advanced-features/using-mdx)

Steps:

1. Install the required packages:

   ```sh
   npm install @next/mdx @mdx-js/loader
   ```

2. Require the package and configure to support top level .mdx pages. The following adds the options object key allowing you to pass in any plugins:

   ```js
   // next.config.js

   const withMDX = require("@next/mdx")({
     extension: /\.mdx?$/,
     options: {
       remarkPlugins: [],
       rehypePlugins: [],
       // If you use `MDXProvider`, uncomment the following line.
       // providerImportSource: "@mdx-js/react",
     },
   });
   module.exports = withMDX({
     // Append the default value with md extensions
     pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
   });
   ```

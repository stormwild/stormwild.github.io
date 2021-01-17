# Tasks

- Setup TypeScript
- Setup Styles
- Setup Amplify Auth

## TypeScript

```sh
yarn add --dev typescript ts-node @types/react @types/react-dom @types/node
```

```sh
yarn add --dev gatsby-plugin-typescript
```

## React Helmet

```sh
yarn add gatsby-plugin-react-helmet react-helmet
yarn add -D @types/react-helmet
```

- [Adding Page Metadata](https://www.gatsbyjs.org/docs/add-page-metadata/)
- [Adding an SEO Component](https://www.gatsbyjs.org/docs/add-seo-component/)
- [It’s All In the Head: Managing the Document Head of a React Powered Site With React Helmet](https://css-tricks.com/its-all-in-the-head-managing-the-document-head-of-a-react-powered-site-with-react-helmet/)
- [Understand how structured data works](https://developers.google.com/search/docs/guides/intro-structured-data)

## Notes

Write pages using Markdown and use transformer plugins to convert markdown to html and use templates to generate pages in Gatsby

[Transformer plugins](https://www.gatsbyjs.org/tutorial/part-six/)

## Enable Markdown pages

```sh
yarn add gatsby-source-filesystem gatsby-transformer-remark
```

https://hackernoon.com/creating-new-gatsby-theme-with-typescript-mdx-and-theme-ui-tz1c3u3u

https://app.pluralsight.com/guides/react-typescript-module-create

## Choco

### Python

```
choco install python --override --installarguments "'TargetDir=D:\'"
choco install python --params "/InstallDir:D:\"
```
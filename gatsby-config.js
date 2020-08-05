/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Stormwild`,
    description: `Developer`,
    author: `Alexander Torrijos`,
  },
  plugins: [
    `gatsby-plugin-root-import`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
  ],
};

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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Stormwild`,
        short_name: `Stormwild`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `static/assets/img/icon/stormwild-logo.svg`,
      },
    },
    `gatsby-plugin-theme-ui`,
  ],
};

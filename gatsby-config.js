module.exports = {
  siteMetadata: {
    title: `Questo blog non ha un titolo.`,
    author: {
      name: `Carlo Martinucci`,
      summary: `un tizio che ha deciso che il mondo va a rotoli perché le persone si fermano ai titoli`,
      email: "carlo.m@hey.com",
    },
    description: `Per leggere questo blog non puoi fermarti al titolo, perché non c'è. In compenso ci sono degli articoli (anch'essi senza titolo). Spero tu possa trovarci qualcosa di interessante, utile o inaspettato, e che tu abbia voglia di scrivermi che cosa ne pensi :)`,
    siteUrl: `https://questoblognonhauntitolo.netlify.app/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-179717117-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Questo blog non ha un titolo`,
        short_name: `No titolo`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://app.us20.list-manage.com/subscribe/post?u=cc8a914b63d9cec896d38f95e&id=9d1aee4563",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

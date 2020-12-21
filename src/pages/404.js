import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPost from "../components/BlogPost"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const post = data.allMarkdownRemark.nodes[0]

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404 Non trovato" />
      <h1>Questa pagina non esiste.</h1>
      <p>
        In gergo tecnico si dice{" "}
        <a href="https://it.wikipedia.org/wiki/Errore_404">404: not found</a>.
        Però, già che sei qui, forse ti interessa l'ultimo articolo pubblicato?
        :)
      </p>
      <BlogPost post={post} />
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        html
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
        }
      }
    }
  }
`

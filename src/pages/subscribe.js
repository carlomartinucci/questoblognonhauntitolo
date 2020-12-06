import React from "react"
import { Link, graphql } from "gatsby"

import Subscribe from "../components/subscribe"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SubscribePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout
      location={location}
      title={siteTitle}
      description={siteDescription}
      rssPath={data.site.siteMetadata.rssPath}
    >
      <Bio key="bio" />
      <SEO title="Iscriviti alla Newsletter" />
      <Subscribe neverHide />
      <Link to="/">
        ← Vai alla pagina principale di questo blog, che non ha un titolo
      </Link>
    </Layout>
  )
}

export default SubscribePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        rssPath
      }
    }
  }
`

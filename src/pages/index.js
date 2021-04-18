import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout
      location={location}
      title={siteTitle}
      description={siteDescription}
      rssPath={data.site.siteMetadata.rssPath}
    >
      <SEO title="Tutti i post" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(preview)}
      </ol>
    </Layout>
  )
}

const preview = post => {
  if (post.frontmatter.type === "video") {
    return videoPreview(post)
  } else {
    return postPreview(post)
  }
}

const videoPreview = post => {
  return (
    <li key={post.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <small>🎥 &nbsp; {post.frontmatter.date}</small>
        </header>

        <section className="d-inline">
          <p className="d-inline" itemProp="description">{post.frontmatter.title}</p>{" "}
          <Link to={post.fields.slug} itemProp="url">
            (guarda il VIDEO)
          </Link>
        </section>
      </article>
    </li>
  )
}

const postPreview = post => {
  const title = post.frontmatter.title || post.fields.slug

  return (
    <li key={post.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <small>📃 &nbsp; {post.frontmatter.date}</small>
        </header>
        <h2>
          <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>{" "}
        <section className="d-inline">
          <p
            className="d-inline"
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description + " " + post.excerpt,
            }}
            itemProp="description"
          />{" "}
          <Link to={post.fields.slug} itemProp="url">
            (continua)
          </Link>
        </section>
      </article>
    </li>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        rssPath
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          type
        }
      }
    }
  }
`

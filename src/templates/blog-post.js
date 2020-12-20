import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import BlogPost from "../components/BlogPost"
import Subscribe from "../components/subscribe"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Share from "../components/share"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout
      location={location}
      title={siteTitle}
      rssPath={data.site.siteMetadata.rssPath}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <BlogPost post={post} />

      <Share
        title={post.frontmatter.title}
        text={post.frontmatter.description || post.excerpt}
        url={location.href}
      />

      <footer>
        <Bio />
        <Subscribe />
      </footer>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
        rssPath
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        description
      }
    }
  }
`

import React from "react"

const BlogPost = ({ post }) => (
  <article className="blog-post" itemScope itemType="http://schema.org/Article">
    <header>
      <p>{post.frontmatter.date}</p>
    </header>
    <h1>{post.frontmatter.title}</h1> <h2>{post.frontmatter.description}</h2>
    <section
      className="d-inline"
      dangerouslySetInnerHTML={{ __html: post.html }}
      itemProp="articleBody"
    />
    <hr />
  </article>
)

export default BlogPost

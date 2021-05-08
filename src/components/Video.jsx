import React from "react"

const Video = ({ video }) => {
  const size = { height: 355, width: 632 }
  if (video.frontmatter.link === "https://www.facebook.com/carlo.mrtn/videos/10224910795421452/") {
    size.height = 619 // 476
    size.width = 347 // 267
  }

  return (
    <article
      className="blog-post"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <p>{video.frontmatter.date}</p>
      </header>
      <h1>{video.frontmatter.title}</h1>{" "}
      <h2>{video.frontmatter.description}</h2>

      <div className="blog-post__video-section" style={{textAlign: "center"}} itemProp="articleBody">
        <iframe
          src={`https://www.facebook.com/plugins/video.php?height=${size.height}&href=${encodeURI(video.frontmatter.link)}&show_text=false&width=${size.width}`}
          width={size.width}
          height={size.height}
          style={{border: "none", overflow: "hidden"}}
          scrolling="no"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen={true}
        />

        <div>
          <small>
            Se preferisci, <a href={video.frontmatter.link}>guardalo su Facebook</a>.
          </small>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: video.html }}
        itemProp="articleBody"
      />
      <hr />
    </article>
  )
}

export default Video

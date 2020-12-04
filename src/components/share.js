import React from "react"

// Polyfill loaded with share-api-polyfill package
const Share = props => {
  const handleClick = e => {
    const shareData = {
      title: props.title,
      text: props.description,
      url: "https://developer.mozilla.org",
      // url: props.url,
    }
    global.navigator.share(shareData)
  }

  return (
    <p>
      Vuoi{" "}
      <button className="btn-link" onClick={handleClick}>
        condividere questo articolo
      </button>{" "}
      sul webbe?
    </p>
  )
}

export default Share

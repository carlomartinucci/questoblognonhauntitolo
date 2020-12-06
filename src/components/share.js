import React from "react"

// Polyfill loaded with share-api-polyfill package
const Share = ({ title, text, url }) => {
  const handleClick = _e => {
    global.navigator.share({ title, text, url })
  }

  return (
    <p>
      Se questo articolo ti è piaciuto,{" "}
      <button className="btn-link" onClick={handleClick}>
        condividilo con un tuo amico
      </button>
      .
    </p>
  )
}

export default Share

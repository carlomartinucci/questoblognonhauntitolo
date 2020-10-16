import React from "react"
import Bio from "./bio"
import { Link } from "gatsby"

const Layout = ({ location, title, description, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = [
      <Bio key="bio" />,
      <h1 key="h1">
        <Link to="/">{title}</Link>
      </h1>,
      ` `,
      <h2 key="h2">{description}</h2>,
    ]
  } else {
    header = (
      <Link to="/">
        ← Torna alla pagina principale di questo blog, che non ha un titolo
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout

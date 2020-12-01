import React from "react"
import Bio from "./bio"
import Subscribe from "./subscribe"
import { Link } from "gatsby"
import useTimeFavicon from "../hooks/useTimeFavicon"

const Layout = ({ location, title, description, rssPath, children }) => {
  useTimeFavicon()
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`
  const isSubscribePath = location.pathname === `${__PATH_PREFIX__}/subscribe`
  let header

  if (isRootPath) {
    header = [
      <Bio key="bio" />,
      <Subscribe key="subscribe" />,
      <h1 key="h1">
        <Link to="/">{title}</Link>
      </h1>,
      ` `,
      <h2 key="h2">{description}</h2>,
    ]
  } else if (isSubscribePath) {
    header = ""
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

      <footer>
        © {new Date().getFullYear()} <Link to={rssPath}>RSS Feed</Link>
      </footer>
    </div>
  )
}

export default Layout

/** @jsx jsx */
import { jsx } from "theme-ui"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import Navigation from "./navigation"
import HeaderExternalLinks from "./header-external-links"

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig()

  return (
    <header sx={{ mb: [5, 6] }}>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
        }}
      >
        <Navigation nav={nav} />
        <HeaderExternalLinks />
      </div>
    </header>
  )
}

export default Header

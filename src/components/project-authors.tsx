import React from "react"
import { Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"

type TagsProps = {
  authors: {
    name: string
    slug: string
  }[]
}

const ItemTags = ({ authors }: TagsProps) => {
  const { basePath } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {authors.map((author, i) => (
        <React.Fragment key={author.slug}>
          {!!i && `, `}
          <TLink as={Link} to={replaceSlashes(`/${basePath}/${author.slug}`)}>
            {author.name}
          </TLink>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ItemTags

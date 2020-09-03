/** @jsx jsx */
import { jsx } from "theme-ui"
import { StaticQuery, graphql } from "gatsby"
import Listing from "./listing"

export default function ProjectPosts({ filter }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allPost(sort: { fields: date, order: DESC }) {
            nodes {
              slug
              title
              date(formatString: "DD.MM.YYYY")
              excerpt
              timeToRead
              description
              tags {
                name
                slug
              }
            }
          }
        }
      `}
      render={data => (
        <Listing posts={data.allPost.nodes} showTags={false} filter={filter}/>
      )}
    />
  )
}

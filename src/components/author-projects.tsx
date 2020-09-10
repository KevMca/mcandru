/** @jsx jsx */
import { jsx } from "theme-ui"
import { StaticQuery, graphql } from "gatsby"
import ProjectListing from "./project-listing"

export default function AuthorProjects({ filter }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allProject {
            nodes {
              title
              slug
              status
              excerpt
              body
              authors {
                name
                slug
              }
            }
          }
        }
      `}
      render={data => (
        <ProjectListing projects={data.allProject.nodes} showAuthors={false} filter={filter}/>
      )}
    />
  )
}

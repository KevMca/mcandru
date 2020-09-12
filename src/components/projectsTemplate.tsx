/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Flex } from "@theme-ui/components"
import Layout from "./layout"
import ProjectListing from "./project-listing"
import SEO from "./seo"
import { graphql } from "gatsby"

export default function Projects(projectsQuery: any) {
  const projects = projectsQuery.data.allProject.nodes;

  return (
    <Layout>
      <SEO title="Projects" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading variant="styles.h2">Projects</Heading>
      </Flex>
      <ProjectListing projects={projects} sx={{ mt: [4, 5] }} />
    </Layout>
  )
}

export const query = graphql`
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
`

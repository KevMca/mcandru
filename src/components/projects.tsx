/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Flex } from "@theme-ui/components"
import Layout from "./layout"
import ProjectListing from "./project-listing"
import SEO from "./seo"

type ProjectProps = {
  projects: {
    title: string
    slug: string
    status: string
    excerpt: string
    body: string
    authors?: {
      name: string
      slug: string
    }[]
  }[]
}

const Projects = ({ projects }: ProjectProps) => {

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

export default Projects

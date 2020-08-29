/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import SEO from "./seo"

type ProjectProps = {
  data: {
    project: {
      title: string
      slug: string
      status: string
      excerpt: string
      body: string
      authors?: {
        name: string
        slug: string
      }[]
    }
  }
}

const Project = ({ data: { project } }: ProjectProps) => (
  <Layout>
    <SEO title={project.title} description={project.excerpt} />
    <section sx={{ my: 5 }}>
      <MDXRenderer>{project.body}</MDXRenderer>
    </section>
  </Layout>
)

export default Project

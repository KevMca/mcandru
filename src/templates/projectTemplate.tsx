/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export default function Project (projectQuery: any) {
  const project = projectQuery.data.project;

  return (
    <Layout>
      <SEO title={project.title} description={project.excerpt} />
      <section sx={{ my: 5 }}>
        <MDXRenderer>{project.body}</MDXRenderer>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    project(slug: { eq: $slug }) {
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
`

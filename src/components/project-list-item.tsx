/** @jsx jsx */
import React from "react"
import { jsx, Link as TLink } from "theme-ui"
import { Box } from "@theme-ui/components"
import { Link } from "gatsby"
import ProjectAuthors from "./project-authors"
import Status from "./status"

type ProjectListItemProps = {
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
  showAuthors?: boolean
}

const ProjectListItem = ({ project, showAuthors = true }: ProjectListItemProps) => (
  <Box mb={4}>

    {/* Header of list item */}
    <div style={{display: "table", alignItems: "center", width: "100%"}}>
      {/* Title of list item */}
      <div style={{ float: `left` }}>
        <TLink as={Link} to={project.slug} sx={{ fontSize: [1, 2, 3], color: `text`}}>
          {project.title}
        </TLink>
      </div>
      {/* Check if status is available */}
      <div style={{ float: `right` }}>
      {project.status && (
          <Status status={project.status}/>
      )}
      </div>
    </div>

    {/* Author information */}
    <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
      {project.authors && showAuthors && (
        <React.Fragment>
          {` — `}
          <ProjectAuthors authors={project.authors} />
        </React.Fragment>
      )}
    </p>

  </Box>
)

export default ProjectListItem

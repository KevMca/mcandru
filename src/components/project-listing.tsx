/** @jsx jsx */
import { jsx } from "theme-ui"
import ProjectListItem from "./project-list-item"

type ListingProps = {
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
  className?: string
  showAuthors?: boolean
}

const Listing = ({ projects, className = ``, showAuthors = true }: ListingProps) => (
  <section sx={{ mb: [5, 6, 7] }} className={className}>
    {projects.map((project) => (
      <div>
        <hr sx={{ borderTop: 10, borderColor: `line`, backgroundColor: `line`}}/>
        <ProjectListItem key={project.slug} project={project} showAuthors={showAuthors} />
      </div>
    ))}
  </section>
)

export default Listing

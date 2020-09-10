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
  filter?: string
}

function doesAuthorExist(authors, filter) {
  for(var author in authors) {    
    var obj = authors[author];
    for(var prop in obj) {
      var str = obj[prop];
      // Check if filter exists
      if(str === filter)
        return true
    }
  }

  return false
}

function FilterPost(props) {
  if(props.filter !== null) {
    if(doesAuthorExist(props.project.authors, props.filter)){
      return (
        <div>
          <hr sx={{ borderTop: 10, borderColor: `line`, backgroundColor: `line`}}/>
          <ProjectListItem project={props.project} showAuthors={props.showAuthors} />
        </div>
      )
    }
    else {
      return null
    }
  }
  else {
    return (
      <div>
        <hr sx={{ borderTop: 10, borderColor: `line`, backgroundColor: `line`}}/>
        <ProjectListItem project={props.project} showAuthors={props.showAuthors} />
      </div>
    )
  }
}

const ProjectListing = ({ projects, className = ``, showAuthors = true, filter = null }: ListingProps) => (
  <section sx={{ mb: [5, 6, 7] }} className={className}>
    {projects.map((project) => (
        <FilterPost key={project.slug} project={project} showAuthors={showAuthors} filter={filter} />
    ))}
  </section>
)

export default ProjectListing

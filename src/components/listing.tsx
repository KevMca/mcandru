/** @jsx jsx */
import { jsx } from "theme-ui"
import BlogListItem from "./blog-list-item"

type ListingProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
  className?: string
  showTags?: boolean
  filter?: string
}

function doesTagExist(tags, filter) {
  for(var tag in tags) {    
    var obj = tags[tag];
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
    console.log(props.post.slug)
    if(doesTagExist(props.post.tags, props.filter)){
      return <BlogListItem post={props.post} showTags={props.showTags} />
    }
    else {
      return null
    }
  }
  else {
    return <BlogListItem post={props.post} showTags={props.showTags} />
  }
}

const Listing = ({ posts, className = ``, showTags = true, filter = null }: ListingProps) => (
  <section sx={{ mb: [5, 6, 7] }} className={className}>
    {posts.map((post) => (
      <FilterPost key={post.slug} post={post} showTags={showTags} filter={filter} />
  ))}
  </section>
)

export default Listing

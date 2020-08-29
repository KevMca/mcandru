/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const ProjectPicture = (props) => {

  return (
    <img 
        src={require(`../../content/projects/${props.slug}/${props.name}`)}
        sx={{ width: 150, height: 150, borderRadius: 150/ 2, border: "1px solid grey"}}
    />
  )
}

export default ProjectPicture

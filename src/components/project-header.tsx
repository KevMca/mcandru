/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import ProjectPicture from "./project-picture"
import Status from "./status"

const ProjectHeader = (props) => {

  return (
    <div style={{display: "flex", flexDirection: "row", verticalAlign: `middle`}}>
        <ProjectPicture name={`${props.name}`} slug={`${props.title.toLowerCase().split(" ").join("-")}`} />
        <div sx={{ display: "flex", 
                alignItems: "center", 
                paddingLeft: "25px", 
                paddingRight: "25px" 
        }}>
            <h2 sx={{ fontSize: [4, 5, 6], fontWeight: `bold`, color: `title` }}>
                {props.title}
            </h2>
        </div>
        <Status status={props.status} />
        {props.children}
    </div>
  )
}

export default ProjectHeader

/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const Timeline = (props) => {
  let color
  let image
  
  switch(props.status) {
    case "In progress":
      color = `#CCAC00`;
      image = "in-progress.png"
      break;
    case "Completed":
      color = `#3CC100`;
      image = "green-tick.png"
      break;
    case "Not started":
    case "Abandoned":
      color = `#C12114`;
      image = "null.png"
      break;
    default:
      color = `#C12114`;
      image = "null.png"
      break;
  }

  var icon = 
    <img 
      src={require(`../../static/${image}`)}
      sx={{ width: 25, height: 25, borderRadius: 25/ 2,
      border: `3px solid ${color}`
    }}/>

  var line = 
    <div sx={{ width: "3px", 
      height: "100%", 
      borderLeft: `3px solid ${color}`, 
      margin: "0px 11px 0px 11px"
    }}>
        &nbsp;
    </div>

  return (
    <div sx={{display: `flex`, flexDirection: `row`, margin: `0`}}>
      {/* Timeline elements */}
      <div>
        <div sx={{ width: "175px", height: `100%` }}>
          <div sx={{ display: `flex`, justifyContent: `center`, height: `100%` }}>
            <div sx={{ display: `flex`, flexDirection: `column`, height: `100%` }}>
              {icon}
              {props.type === "normal" && (line)}
            </div>
          </div>
        </div>
      </div>
      {/* Text box */}
      <div sx={{display: `flex`, flexDirection: `column`}}>
        {/* Title */}
        <h1 sx={{ fontWeight: `normal`, fontSize: [2, 3], color: `heading`, margin: `-9px 0 0 0` }}>
          {props.title}
        </h1>
        {/* Date or progress */}
        <p sx={{ fontStyle: `italic`, fontWeight: `normal`, fontSize: [1, 2], color: `light`, margin: `10px 0 0 0` }}> 
          ... {props.status} {props.date && (props.date)}
        </p>
        {/* Description */}
        <p sx={{ fontWeight: `normal`, fontSize: [1, 2], color: `light`, margin: `5px 0 0 0` }}> 
          {props.children}
        </p>
        {/* Posts */}
        {props.posts && <p sx={{ fontWeight: `normal`, fontSize: [1, 2], color: `light`, margin: `5px 0 0 0` }}>
          Posts: 
          {props.posts.map((post, index) => (
            <Link key={post} to={post}> 
              {post} 
              {index !== (props.posts.length - 1) && <span>,</span>}
            </Link>
          ))}
        </p>}
        <br/>
      </div>
    </div>
  )
}

export default Timeline

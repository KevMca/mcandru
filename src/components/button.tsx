/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const Button = (props) => {
  
  return (
    <div sx={{  display: "flex", 
          alignItems: "center", 
          paddingLeft: "10px", 
          paddingRight: "10px",
          button: {
            fontSize:"15px", 
            textAlign: "center",
            fontFamily: "IBM Plex Sans",
            fontWeight: "normal",
            verticalAlign: "middle",
            height: "25px",
            color: "#ffffff",
            boxShadow: "none",
            border: "0",
            borderRadius: "7px",
            cursor: `pointer`,
            outline: "0"
          }
    }}>
      <a href={props.url}>
        <button style={{ 
          backgroundColor: `${props.color}`,
        }}>
          {props.children}
        </button>
      </a>
    </div>
  )
}

export default Button
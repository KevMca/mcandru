/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const Button = (props) => {
    
    return (
        <div sx={{  display: "flex", 
                    alignItems: "center", 
                    paddingLeft: "10px", 
                    paddingRight: "10px" 
        }}>
            <a href={props.url}>
                <button style={{ 
                    fontSize:"20px", 
                    textAlign: "center",
                    fontFamily: "IBM Plex Sans",
                    fontWeight: "normal",
                    verticalAlign: "middle",
                    height: "40px",
                    color: "#ffffff", 
                    backgroundColor: `${props.color}`,
                    boxShadow: "none",
                    border: "0",
                    borderRadius: "7px",
                    cursor: "pointer",
                    outline: "0"
                }}>
                    {props.children}
                </button>
            </a>
        </div>
  )
}

export default Button

/** @jsx jsx */
import { jsx } from "theme-ui"

const Status = (props) => {
  let color

  switch(props.status) {
    case "in progress":
      color = `#CCAC00`;
      break;
    case "complete":
      color = `#3CC100`;
      break;
    case "not started":
    case "abandoned":
      color = `#C12114`;
      break;
    default:
      color = `#C12114`;
      break;
  }

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
            outline: "0"
          }
    }}>
      <button style={{
        backgroundColor: `#767D89`,
        borderRadius: "7px 0px 0px 7px"
      }}>
        status
      </button>
      <button style={{  
        backgroundColor: `${color}`,
        borderRadius: "0px 7px 7px 0px",
        width: 100,
      }}>
        {props.status}
      </button>
    </div>
  )
}

export default Status

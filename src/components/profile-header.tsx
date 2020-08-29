/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import ProfilePicture from "./profile-picture"
import Button from "./button"

const ProfileHeader = (props) => {

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
        <ProfilePicture name={`${props.name}`} />
        <div sx={{ display: "flex", 
                alignItems: "center", 
                paddingLeft: "25px", 
                paddingRight: "25px" 
        }}>
            <h2 sx={{ fontSize: [4, 5, 6], fontWeight: `bold`, color: `title` }}>
                {props.title}
            </h2>
        </div>
        {props.children}
    </div>
  )
}

export default ProfileHeader

/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import ProfilePicture from "./profile-picture"
import Button from "./button"

const ProfileHeader = (props) => {

  return (
    <div sx={{
      display: "flex",
      flexDirection: "row",
      '@media screen and (max-width: 700px)': {
        flexDirection: "column",
        alignItems: "center",
      },
    }}>
      <div sx={{ display: "flex", flexDirection: "row" }}>
        <ProfilePicture name={`${props.name}`} slug={`${props.title.toLowerCase()}`} />
      </div>
      <div sx={{ display: "flex", 
              alignItems: "center", 
              paddingLeft: "25px", 
              paddingRight: "25px" 
      }}>
        <h2 sx={{ fontSize: [4, 5, 6], fontWeight: `bold`, color: `title` }}>
          {props.title}
        </h2>
      </div>
      <div sx={{ display: "flex", flexDirection: "row" }}>
        {props.children}
      </div>
    </div>
  )
}

export default ProfileHeader

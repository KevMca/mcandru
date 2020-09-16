/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const ProfilePicture = (props) => {

  return (
    <img 
        src={props.src}
        sx={{ width: 150, objectFit: "cover", height: 150, borderRadius: 150/ 2, border: `0px` }}
    />
  )
}

export default ProfilePicture

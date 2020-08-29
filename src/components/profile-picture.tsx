/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const ProfilePicture = (props) => {

  return (
    <img 
        src={require(`../../content/pages/${props.slug}/${props.name}`)}
        sx={{ width: 150, height: 150, borderRadius: 150/ 2}}
    />
  )
}

export default ProfilePicture

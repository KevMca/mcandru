/** @jsx jsx */
import { jsx, Link } from "theme-ui"

const ProfilePicture = (props) => {

  return (
    <img 
        src={require(`../../static/${props.name}`)}
        sx={{ width: 150, height: 150, borderRadius: 150/ 2}}
    />
  )
}

export default ProfilePicture

/** @jsx jsx */
import { jsx } from "theme-ui"
import Status from "./status"
import ProfileHeader from "./profile-header";

const ProjectHeader = (props) => {
  return (
    <ProfileHeader image={props.image} title={props.title}>
      <Status status={props.status} />
      {props.children}
    </ProfileHeader>
  );
};

export default ProjectHeader;

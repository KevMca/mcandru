/** @jsx jsx */
import { jsx } from "theme-ui"


const Timeline = (props) => {
  return (
    <div sx={{ marginTop: 50 }}>
      <div>{props.children}</div>
    </div>
  );
}

export default Timeline

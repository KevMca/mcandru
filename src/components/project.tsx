/** @jsx jsx */
import React from "react";
import ProjectHeader from "./project-header";
import Button from "./button";
import { jsx } from "theme-ui";

const Project = (props) => {
  const buttonItems = props.buttons.map((button) => 
    <Button color={button.color} key={button.toString()} url={button.url}>{button.text}</Button>
  );

  return (
    <div>
      <ProjectHeader image={props.headerImage} title={props.title} status={props.status}>
        {buttonItems}
      </ProjectHeader>
      <div sx={{
        margin: "20px 0px 0px 175px",
        '@media screen and (max-width: 800px)': {
          margin: "20px 0px",
        },
      }}>{props.children}</div>
    </div>
  );
}

export default Project

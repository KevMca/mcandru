import React from "react"
import Projects from "../../../components/projects"

type Props = {
  data: {
    allProject: any
    [key: string]: string
  }
}

export default function MinimalBlogCoreProjects({ data }: Props) {
  const { allProject } = data

  return <Projects projects={allProject.nodes} />
}

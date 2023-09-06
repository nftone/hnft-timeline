const fromTimelineProject = (project: TimelineProject): TimelineProjectData => {
  return {
    name: project.name,
    slug: project.slug,
    date: project.date,
    description: project.description,
    creator: project.creator,
    links: JSON.parse(JSON.stringify(project.links)),
    network: project.network,
  }
}

export default {
  fromTimelineProject,
}

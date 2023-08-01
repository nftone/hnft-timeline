import { RouteLocationNormalizedLoaded } from "vue-router"
import data from "../src/data/timelineData.json"
import * as net from "net";

// @ts-ignore
const projects: TimelineProject[] = data.projects.map((e: TimelineProject) => ({
  ...e,
  type: "project",
}))

// @ts-ignore
const events: TimelineEvent[] = data.events.map((e: TimelineEvent) => ({
  ...e,
  type: "event",
}))

const taxonomy = data.taxonomy

const networks = data.taxonomy.networks

let networkFilter: string = ""

const filterProjects = (projects: TimelineProject[]): TimelineProject[] => {
  if (networkFilter === "") return projects
  return projects.filter(({ network }) => network === networkFilter)
}

export default function useTimelineData(route: RouteLocationNormalizedLoaded) {
  networkFilter = String(route.query?.network || "")

  const filteredProjects = filterProjects(projects)

  const getTimelineItemsByPeriod = (
    year: number,
    month: number
  ): (TimelineProject | TimelineEvent)[] => {
    const projects = getTimelineProjectsByPeriod(year, month)
    const events = getTimelineEventsByPeriod(year, month)
    return [...projects, ...events].sort((a, b) => {
      const aDate = new Date(a.date).getTime()
      const bDate = new Date(b.date).getTime()
      return aDate - bDate
    })
  }

  const getTimelineProjectsByPeriod = (
    year: number,
    month: number
  ): TimelineProject[] => {
    const projectsInTheMonth = [...filteredProjects]
      .filter((project) => {
        const projectDate = new Date(project.date)
        return (
          projectDate.getFullYear() === year && projectDate.getMonth() === month
        )
      })
      .sort((a, b) => {
        const aDate = new Date(a.date).getTime()

        const bDate = new Date(b.date).getTime()
        return aDate - bDate
      })

    return projectsInTheMonth
  }

  const getTimelineEventsByPeriod = (
    year: number,
    month: number
  ): TimelineEvent[] => {
    const eventsInTheMonth = [...events]

      .filter((event) => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getFullYear() === year && eventDate.getMonth() === month
        )
      })

      .sort((a, b) => {
        const aDate = new Date(a.date).getTime()

        const bDate = new Date(b.date).getTime()
        return aDate - bDate
      })

    return eventsInTheMonth
  }

  const getEventBySlug = (slug: string): TimelineEvent => {
    const event = events.find((event) => event.slug === slug)
    if (!event) throw new Error(`Event with slug ${slug} not found`)
    return event
  }

  const getProjectBySlug = (slug: string): TimelineProject => {
    const project = projects.find((project) => project.slug === slug)
    if (!project) throw new Error(`Project with slug ${slug} not found`)
    return project
  }

  const getLinkTypeImage = (linkType: string): string => {
    const linkTypeData = taxonomy.linkTypes.find(
      ({ name }) => name === linkType
    )

    if (!linkTypeData)
      throw new Error(`Link type with name ${linkType} not found`)

    return `images/taxonomy/${linkTypeData.image}`
  }

  const getNetworkImage = (networkName: string): string => {
    const networkImageData = taxonomy.networks.find(
      ({ name }) => name === networkName
    )

    if (!networkImageData) {
      throw new Error(`Network with name ${networkName} not found`)
    }

    return `images/taxonomy/${networkImageData.image}`
  }

  const getEarliestItem = (): TimelineProject | TimelineEvent => {
    const items = [filteredProjects[0], events[0]].sort((a, b) => {
      const aDate = new Date(a.date).getTime()
      const bDate = new Date(b.date).getTime()
      return aDate - bDate
    })
    return items[0]
  }

  const getLatestItem = (): TimelineProject | TimelineEvent => {
    const items = [
      filteredProjects[filteredProjects.length - 1],
      events[events.length - 1],
    ].sort((a, b) => {
      const aDate = new Date(a.date).getTime()
      const bDate = new Date(b.date).getTime()
      return aDate - bDate
    })
    return items[1]
  }



  return {
    getTimelineItemsByPeriod,
    getEventBySlug,
    getProjectBySlug,
    getLinkTypeImage,
    getNetworkImage,
    getEarliestItem,
    getLatestItem,
    networks,
  }
}

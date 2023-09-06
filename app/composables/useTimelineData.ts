import { RouteLocationNormalizedLoaded } from "vue-router"
import data from "../src/data/timelineData.json"

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

const filterProjects = (): TimelineProject[] => {
  if (networkFilter === "") return projects
  return projects.filter(({ network }) => network === networkFilter)
}

const filterEvents = (): TimelineEvent[] => {
  if (networkFilter === "") return events
  return events.filter(({ network }) => network === networkFilter)
}

export default function useTimelineData(route: RouteLocationNormalizedLoaded) {
  networkFilter = String(route.query?.network || "")

  const filteredProjects = filterProjects()
  const filteredEvents = filterEvents()

  const getTimelineItemsByPeriod = (
    year: number,
    month: number
  ): (TimelineProject | TimelineEvent)[] => {
    const projects = getTimelineProjectsByPeriod(year, month - 1)
    const events = getTimelineEventsByPeriod(year, month - 1)
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
    const eventsInTheMonth = [...filteredEvents]

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

  const getProjectContributionUrl = (project: TimelineProject): string => {
    const dateSlug = `${project.date}-${project.slug}`
    return `https://github.com/nftone/hnft-timeline/edit/master/data/projects/${dateSlug}/data.json`
  }

  const getLinkTypeImage = (linkType: string): string => {
    const linkTypeData = taxonomy.linkTypes.find(
      ({ name }) => name === linkType
    )

    if (!linkTypeData)
      throw new Error(`Link type with name ${linkType} not found`)

    return `images/taxonomy/${linkTypeData.image}`
  }

  const getNetworkImage = (networkSlug: string): string => {
    const networkImageData = taxonomy.networks.find(
      ({ slug }) => slug === networkSlug
    )

    if (!networkImageData) {
      throw new Error(`Network with name ${networkSlug} not found`)
    }

    return `images/taxonomy/${networkImageData.image}`
  }

  const getNetworkName = (networkSlug: string): string => {
    const network = taxonomy.networks.find(({ slug }) => slug === networkSlug)
    if (!network) return "-"
    return network.name
  }

  const getEarliestItem = (): TimelineProject | TimelineEvent => {
    const items = [filteredProjects[0], filteredEvents[0]].sort((a, b) => {
      const aDate = new Date(a.date).getTime()
      const bDate = new Date(b.date).getTime()
      return aDate - bDate
    })
    return items[0]
  }

  const getLatestItem = (): TimelineProject | TimelineEvent => {
    const items = [
      filteredProjects[filteredProjects.length - 1],
      filteredEvents[filteredEvents.length - 1],
    ].sort((a, b) => {
      const aDate = new Date(a.date).getTime()
      const bDate = new Date(b.date).getTime()
      return bDate - aDate
    })
    return items[0]
  }

  return {
    getEarliestItem,
    getEventBySlug,
    getLatestItem,
    getLinkTypeImage,
    getNetworkImage,
    getNetworkName,
    getProjectBySlug,
    getProjectContributionUrl,
    getTimelineItemsByPeriod,
    networks,
    taxonomy,
  }
}

import data from "../src/data/timelineData.json";

// @ts-ignore
const projects: TimelineProject[] = data.projects.map((e: TimelineProject) => ({
  ...e,
  type: "project",
}));

const events: TimelineEvent[] = data.events.map((e: TimelineEvent) => ({
  ...e,
  type: "event",
}));

const taxonomy = data.taxonomy;

export default function useTimelineData() {
  const getTimelineItemsByPeriod = (
    year: number,
    month: number
  ): (TimelineProject | TimelineEvent)[] => {
    const projects = getTimelineProjectsByPeriod(year, month);
    const events = getTimelineEventsByPeriod(year, month);
    return [...projects, ...events].sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return aDate - bDate;
    });
  };

  const getTimelineProjectsByPeriod = (
    year: number,
    month: number
  ): TimelineProject[] => {
    const projectsInTheMonth = [...projects]
      .filter((project) => {
        const projectDate = new Date(project.date);
        return (
          projectDate.getFullYear() === year && projectDate.getMonth() === month
        );
      })
      .sort((a, b) => {
        const aDate = new Date(a.date).getTime();

        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      });

    return projectsInTheMonth;
  };

  const getTimelineEventsByPeriod = (
    year: number,
    month: number
  ): TimelineEvent[] => {
    const eventsInTheMonth = [...events]

      .filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === year && eventDate.getMonth() === month
        );
      })

      .sort((a, b) => {
        const aDate = new Date(a.date).getTime();

        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      });

    return eventsInTheMonth;
  };

  const getEventBySlug = (slug: string) => {
    return events.find((event) => event.slug === slug);
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find((project) => project.slug === slug);
  };

  const getLinkTypeImage = (linkType: string) => {
    const linkTypeData = taxonomy.linkTypes.find(
      ({ name }) => name === linkType
    );

    if (!linkTypeData) return null;

    return `images/taxonomy/${linkTypeData.image}`;
  };

  const getNetworkImage = (networkName: string) => {
    const networkImageData = taxonomy.networks.find(
      ({ name }) => name === networkName
    );

    if (!networkImageData) return null;

    return `images/taxonomy/${networkImageData.image}`;
  };

  return {
    getTimelineItemsByPeriod,
    getEventBySlug,
    getProjectBySlug,
    getLinkTypeImage,
    getNetworkImage,
  };
}

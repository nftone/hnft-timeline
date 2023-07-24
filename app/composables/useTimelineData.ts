import { ref } from "vue";

const projects = ref<TimelineProject[]>([]);
const events = ref<TimelineEvent[]>([]);
const taxonomy = ref<Taxonomy>({ linkTypes: [], networks: [] });
const loading = ref(true);

export default function useTimelineData() {
  const initialize = async () => {
    const data = await fetch("/data/timelineData.json");
    const parsedData = await data.json();

    events.value = parsedData.events.map((e: TimelineEvent) => ({
      ...e,
      type: "event",
    }));

    projects.value = parsedData.projects.map((e: TimelineProject) => ({
      ...e,
      type: "project",
    }));

    taxonomy.value = parsedData.taxonomy;

    loading.value = false;
  };

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
    const projectsInTheMonth = [...projects.value]
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
    const eventsInTheMonth = [...events.value]

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
    return events.value.find((event) => event.slug === slug);
  };

  const getProjectBySlug = (slug: string) => {
    return projects.value.find((project) => project.slug === slug);
  };

  const getLinkTypeImage = (linkType: string) => {
    const linkTypeData = taxonomy.value.linkTypes.find(
      ({ name }) => name === linkType
    );

    if (!linkTypeData) return null;

    return `images/taxonomy/${linkTypeData.image}`;
  };

  const getNetworkImage = (networkName: string) => {
    const networkImageData = taxonomy.value.networks.find(
      ({ name }) => name === networkName
    );

    if (!networkImageData) return null;

    return `images/taxonomy/${networkImageData.image}`;
  };

  return {
    initialize,
    loading,
    getTimelineItemsByPeriod,
    getEventBySlug,
    getProjectBySlug,
    getLinkTypeImage,
    getNetworkImage,
  };
}

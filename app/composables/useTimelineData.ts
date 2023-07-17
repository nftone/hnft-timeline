import { ref } from "vue";

interface Event {
  name: String;
  slug: String;
  date: Date;
}

interface Project {
  name: String;
  slug: String;
  date: Date;
  description: String;
  creator: String;
  links: [];
  network: String;
}

const projects = ref<Project[]>([]);
const events = ref<Event[]>([]);
const loading = ref(true);

export default function useTimelineData() {
  const initialize = async () => {
    // get public/data/timelineData.json
    // parse json
    // return data
    const data = await fetch("/data/timelineData.json");
    const parsedData = await data.json();

    events.value = parsedData.events.map((e: Event) => ({ ...e, type: "event" }));

    projects.value = parsedData.projects.map((e: Project) => ({
      ...e,
      type: "project",
    }));
    loading.value = false;
  };

  // @TODO: Remplacer any par le type de retour
  const getTimelineItemsByPeriod = (year: number, month: number): any => {
    const projects = getTimelineProjectsByPeriod(year, month);
    const events = getTimelineEventsByPeriod(year, month);
    return [...projects, ...events].sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return aDate - bDate;
    });
  };

  // TODO merge getTimelineProjectsByPeriod et getTimelineEventsByPeriod
  const getTimelineProjectsByPeriod = (year: number, month: number): any => {
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

    // Replace placeholder logic by a better one
    if (projectsInTheMonth.length === 0) return [{ placeholder: true }];

    return projectsInTheMonth;
  };

  const getTimelineEventsByPeriod = (year: number, month: number): any => {
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


    if (eventsInTheMonth.length === 0) return [{ placeholder: true }];

    return eventsInTheMonth;
  };

  console.log(
    "🚀 ~ file: useTimelineData.ts:92 ~ getEventBySlug ~ events.value:",
    events.value
  );
  const getEventBySlug = (slug: string) => {
    console.log(
      "🚀 ~ file: useTimelineData.ts:92 ~ getEventBySlug ~ events.value:",
      events.value
    );

    return events.value.find((event) => event.slug === slug);
  };

  const getProjectBySlug = (slug : string) => {

    return projects.value.find((project) => project.slug === slug);
  }

  return {
    initialize,
    loading,
    getTimelineItemsByPeriod,
    getEventBySlug,
    getProjectBySlug
    // projects,
    // events,
  };
}

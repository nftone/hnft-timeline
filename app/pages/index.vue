<template>
  <LoadingOverlay v-if="loading" />

  <div v-else  class="app">
    <TimelineHeader />

    <div class="timeline-container">
      <div v-for="(year, id) in years" :key="id" class="year-inner-container">
        <div class="year-name-container">
          <span class="year">{{ year.number }}</span>
        </div>

        <div class="year-months-container">
          <div v-for="month in months" :key="month.name">
            <div class="month-name">
              {{ month.name }}
            </div>
            <div
              v-for="(project, i) in getTimelineEventsByPeriod(
                year.number,
                month.number
              )"
              :key="`item-${i}`"
              class="month-projects-container"
            >
              <TimelineEvent v-if="!project.placeholder" :item="project" />
            </div>
            <div
              v-for="(project, i) in getTimelineProjectsBy(year.number, month.number)"
              :key="`item-${i}`"
              class="month-projects-container"
            >
              <TimelineItem :item="project" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

import { months } from "../services/months";
import { TIMELINE_URL } from "../constants/appConstants";
import { years } from "../services/years";
import LoadingOverlay from "../components/LoadingOverlay.vue";
import TimelineEvent from "../components/TimelineEvent.vue";
import TimelineHeader from "../components/TimelineHeader.vue";
import TimelineItem from "../components/TimelineItem.vue";

export default {
  components: {
    TimelineItem,
    TimelineEvent,
    TimelineHeader,
    LoadingOverlay,
  },

  data: () => ({
    months,
    years,
    projects: [],
    eventsList: [],
    loading: true,
  }),

  async created() {
    try {
      const timelineResponse = await Axios.get(TIMELINE_URL);
      const data = timelineResponse.data;
      this.eventsList = data.timelineEvents;
      this.projects = data.timelineItems;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },

  methods: {
    getTimelineProjectsBy(year, month) {
      const projectsInTheMonth = [...this.projects]
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

      if (projectsInTheMonth.length === 0) return [{ placeholder: true }];

      return projectsInTheMonth;
    },

    getTimelineEventsByPeriod(year, month) {
      const eventsInTheMonth = [...this.eventsList]
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
    },
  },
};
</script>

<style>

.timeline-container a {
  font-family: Lato,Helvetica,Arial,sans-serif;
  color: #fff;
}

.timeline-container {
  font-family: Lato,Helvetica,Arial,sans-serif;
  color: #fff;
  background-color: #252525;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}

.year-inner-container {
  margin: 0 10px;
}

.year {
  padding: 6px;
}

.year-name-container {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #656565;
  height: 100%;
  display: grid;
  place-content: center;
  border-radius: 4px;
}

.year-months-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 10px 10px;
}

.month-projects-container {
  justify-content: left;
  background-color: #656565;
  border-radius: 4px;
  margin: 4px;
}

.month-projects-container:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}

.month-name {
  text-align: center;
  padding: 2px;
  font-weight: bold;
}
</style>

<template>
  <LoadingOverlay v-if="loading" />

  <div v-else class="app">
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
              v-for="(item, i) in getTimelineItemsByPeriod(
                year.number,
                month.number
              )"
              :key="`item-${i}`"
              class="month-projects-container"
            >
              <TimelineEvent v-if="item.type === 'event'" :event="item" />
              <TimelineProject v-if="item.type === 'project'" :project="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showEventModal" @close="onCloseEventModal">
    <TimelineEventDetail :slug="eventSlug" />
  </Modal>

  <Modal v-if="showProjectModal" @close="onCloseProjectModal">
    <TimelineProjectDetail :slug="projectSlug" />
  </Modal>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useScrollLock } from "@vueuse/core";

import { months } from "../services/months";
import { years } from "../services/years";

import LoadingOverlay from "../components/LoadingOverlay.vue";
import Modal from "../components/Modal.vue";
import TimelineEvent from "../components/TimelineEvent.vue";
import TimelineEventDetail from "../components/TimelineEventDetail.vue";
import TimelineHeader from "../components/TimelineHeader.vue";
import TimelineProject from "../components/TimelineProject.vue";
import TimelineProjectDetail from "../components/TimelineProjectDetail.vue";
import useTimelineData from "../composables/useTimelineData";

const { loading, initialize, getTimelineItemsByPeriod } = useTimelineData();
const route = useRoute();
const router = useRouter();

const el = document.querySelector("body");
const isLocked = useScrollLock(el);

const showEventModal = ref(false);
const eventSlug = ref(route.query.event);
const showProjectModal = ref(false);
const projectSlug = ref(route.query.project);

onMounted(async () => {
  await initialize();
  if (route.query.event) {
    showEventModal.value = true;
    eventSlug.value = route.query.event;
  }
  if (route.query.project) {
    showProjectModal.value = true;
    projectSlug.value = route.query.project;
  }
});

const onCloseEventModal = () => {
  showEventModal.value = false;
  router.push({ query: "" });
};

const onCloseProjectModal = () => {
  showProjectModal.value = false;
  router.push({ query: "" });
};

watch(
  () => route.query,
  () => {
    if (route.query.event) {
      showEventModal.value = true;
      eventSlug.value = route.query.event;
    } else {
      eventSlug.value = null;
      showEventModal.value = false;
    }
    if (route.query.project) {
      showProjectModal.value = true;
      projectSlug.value = route.query.project;
    } else {
      projectSlug.value = null;
      showProjectModal.value = false;
    }
  }
);

// watch modal open and lock if true
watch(
  () => [showEventModal.value, showProjectModal.value],
  () => {
    if (showEventModal.value || showProjectModal.value) {
      isLocked.value = true;
    } else {
      isLocked.value = false;
    }
  },
  { deep: true }
);

const hasProjectsOrEventsInMonth = (year, month) => {
  const projects = getTimelineProjectsByPeriod(year, month);
  const events = getTimelineEventsByPeriod(year, month);
  return projects.length > 0 || events.length > 0;
};
</script>

<style>
.timeline-container a {
  color: var(--white-text);
}

.timeline-container {
  color: var(--white-text);
  background-color: var(--bkg-black);
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
  background-color: var(--bkg-grey);
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
  background-color: var(--bkg-grey);
  border-radius: 4px;
  margin: 4px;
}

.month-projects-container-test {
  justify-content: left;
  background-color: var(--bkg-grey);
  border-radius: 4px;
  margin: 4px;
  color: var(--bkg-grey);
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

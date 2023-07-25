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
            <TimelineMonth :year="year" :month="month"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Transition>
    <Modal v-if="showEventModal" @close="onCloseEventModal">
        <TimelineEventDetail :slug="eventSlug" />
    </Modal>
  </Transition>

  <transition>
    <Modal v-if="showProjectModal" @close="onCloseProjectModal">
      <TimelineProjectDetail :slug="projectSlug" />
    </Modal>
  </transition>

</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useScrollLock } from "@vueuse/core";

import { months } from "../services/months";
import { years } from "../services/years";

import LoadingOverlay from "../components/LoadingOverlay.vue";
import Modal from "../components/Modal.vue";
import TimelineEventDetail from "../components/TimelineEventDetail.vue";
import TimelineHeader from "../components/TimelineHeader.vue";
import TimelineProjectDetail from "../components/TimelineProjectDetail.vue";
import useTimelineData from "../composables/useTimelineData";
import TimelineMonth from "../components/TimelineMonth.vue";

const { loading, initialize } = useTimelineData();
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

</script>

<style>
.timeline-container a {
  color: var(--white-text);
}

.timeline-container {
  color: var(--white-text);
  background-color: var(--dark);
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
  background-color: var(--grey);
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

.month-name {
  text-align: center;
  padding: 2px;
  font-weight: bold;
}

.v-enter-active
{
  transition: opacity 0.5s ease;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="app">
    <TimelineHeader />
    <div class="timeline-container">
      <div
        v-for="(year, id) in years"
        :key="id"
        class="year-inner-container"
      >
        <div class="year-name-container">
          <span class="year">{{ year.number }}</span>
        </div>
        <div class="year-months-container">
          <div
            v-for="month in months"
            :key="month.name"
          >
            <div class="month-name">
              {{ month.name }}
            </div>
            <TimelineMonth
              :year="year"
              :month="month"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal @close="() => router.push({ path: '/' })">
    <TimelineEventDetail :slug="route.params.event" />
  </Modal>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"

import { months } from "../../services/months"
import { years } from "../../services/years"

import Modal from "../../components/Modal.vue"
import TimelineHeader from "../../components/TimelineHeader.vue"
import TimelineMonth from "../../components/TimelineMonth.vue"

const route = useRoute()
const router = useRouter()
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

.v-enter-active {
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

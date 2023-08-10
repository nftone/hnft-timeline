<template>
  <div class="app">
    <div class="timeline-container">
      <div
        v-for="calendarYear in calendar"
        :key="calendarYear.year.number"
        class="year-inner-container"
      >
        <div class="year-name-container">
          <span class="year">{{ calendarYear.year.number }}</span>
        </div>
        <div class="year-months-container">
          <TimelineMonth
            v-for="month in calendarYear.months"
            :key="month"
            :year="calendarYear.year"
            :month-number="month"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCalendar } from "../services/calendar"
import useTimelineData from "../composables/useTimelineData"

import TimelineMonth from "./TimelineMonth.vue"

const { getEarliestItem, getLatestItem } = useTimelineData(useRoute())
const earliestItem = getEarliestItem()
const latestItem = getLatestItem()

const calendar: CalendarYear[] = getCalendar(
  new Date(earliestItem.date),
  new Date(latestItem.date)
)
</script>

<style>
.timeline-container {
  color: var(--white-text);
  background-color: var(--dark);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
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
  margin: 1rem 0;
}

.month-name {
  text-align: center;
  padding: 2px;
  font-weight: bold;
}
</style>

<template>
  <div class="app">
    <div class="timeline-container">
      <div
        v-for="calendarYear in calendar"
        :key="calendarYear.year.id"
        class="year-inner-container"
      >
        <div class="year-name-container">
          <span class="year">{{ calendarYear.year.number }}</span>
        </div>
        <div class="year-months-container">
          <div v-for="month in calendarYear.months" :key="month">
            <div class="month-name">
              {{ getMonthName(month) }}
            </div>
            <TimelineMonth :year="calendarYear.year" :months="[month]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useTimelineData from "../composables/useTimelineData"
import { years, getMonthName, getCalendar } from "../services/calendar"

const { getEarliestItem, getLatestItem } = useTimelineData(useRoute())
const earliestItem = getEarliestItem()
const latestItem = getLatestItem()

interface CalendarYear {
  year: Year
  months: number[]
}

const calendar: CalendarYear[] = getCalendar(new Date(earliestItem.date), new Date(latestItem.date)).map(year => {
  // enlever les mois et annees avant le premier item et apres le dernier item
  return {
    year,
    months: [...Array(12).keys()],
  };
});

import TimelineMonth from "./TimelineMonth.vue"
</script>

<style>
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
</style>

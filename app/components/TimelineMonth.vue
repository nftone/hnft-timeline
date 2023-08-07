<template>
<div>
  <div
      v-if="isEmpty()"
      class="month-projects-container-empty"
  >
    &nbsp;
  </div>
  <div
      v-for="(month, index) in months"
      :key="index"
  >
    <div v-for="(item, i) in getTimelineItemsByPeriod(year.number, month)"
         :key="`item-${i}`"
         class="month-projects-container"
    >
      <TimelineEvent v-if="item.type === 'event'" :event="item" />
      <TimelineProject v-else-if="item.type === 'project'" :project="item" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import TimelineEvent from "../components/TimelineEvent.vue"
import TimelineProject from "../components/TimelineProject.vue"
import useTimelineData from "../composables/useTimelineData"

const { getTimelineItemsByPeriod, getEarliestItem, getLatestItem} = useTimelineData(useRoute())

const props = defineProps<{
  year: Year
  months: number[]
}>()

function isEmpty(): boolean {
  for (const month of props.months) {
    if (getTimelineItemsByPeriod(props.year.number, month).length > 0 ) {
      return false;
    }
  }
  return true;
}
</script>

<style>
.month-projects-container {
  justify-content: left;
  background-color: var(--grey);
  border-top: 1px solid var(--grey);
  border-radius: 4px;
  margin: 4px;
}

.month-projects-container-empty {
  justify-content: left;
  background-color: var(--grey);
  border-radius: 4px;
  margin: 4px;
  height: 9px;
}

.month-projects-container:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>

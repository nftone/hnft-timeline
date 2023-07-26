<template>
  <div>
    <h2>
      {{ event.name }}
    </h2>
    <div>
      {{ event.date }}
    </div>

    <div class="detail-image">
      <nuxt-img
        class="image-size"
        :src="`images/events/${event.image}`"
        alt="image of event"
        width="250px"
        height="250px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useTimelineData from "../composables/useTimelineData"
const props = defineProps<{ slug: string }>()
const { getEventBySlug } = useTimelineData()
const event = getEventBySlug(props.slug)
</script>

<style>
.detail-image img {
  background-color: white;
}
</style>

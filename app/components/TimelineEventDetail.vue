<template>
  <div>
    <h2>
      {{ event.name }}
    </h2>

    <div class="detail-image">
      <nuxt-img
        class="image-size"
        :src="`images/events/${event.image}`"
        :alt="`Image of event ${event.name}`"
        width="250px"
        height="250px"
      />
    </div>

    <div>
      <div class="subheader">Date</div>
      {{ event.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useTimelineData from "../composables/useTimelineData"
const props = defineProps<{ slug: string }>()
const { getEventBySlug } = useTimelineData(useRoute())
const event = getEventBySlug(props.slug)
</script>

<style>
.detail-image img {
  background-color: white;
}
</style>

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
      />
    </div>
  </div>
</template>

<script setup>
import useTimelineData from "../composables/useTimelineData";
const props = defineProps(["slug"]);
const { getEventBySlug } = useTimelineData();
const event = getEventBySlug(props.slug);
</script>

<style>
/* @TODO Rename and move size should be defined in nuxt-img component */
.image-size {
  width: 250px;
  height: 250px;
  background-color: white;
}
</style>

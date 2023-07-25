<template>
  <div v-if="!loading">
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
import { onMounted, defineProps, ref } from "vue";
import useTimelineData from "../composables/useTimelineData";

const props = defineProps(["slug"]);

const loading = ref(true);
const event = ref(null);

onMounted(async () => {
  const { getEventBySlug, initialize } = useTimelineData();
  await initialize();
  event.value = getEventBySlug(props.slug);
  loading.value = false;
});
</script>

<style>
/* @TODO Rename and move */
.image-size {
  width: 250px;
  height: 250px;
  background-color: white;
}
</style>

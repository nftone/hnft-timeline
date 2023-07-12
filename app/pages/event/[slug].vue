<template>
  <div v-if="!loading">
    project slug: {{ route.params.slug }}

    {{ event }}
    <!-- <p>Test</p>

  <p>Name of event : {{ $route.params.item.name }}</p> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useTimelineData from "../../composables/useTimelineData";

const loading = ref(true);
const event = ref(null);

const route = useRoute();

onMounted(async () => {
  const { getEventBySlug, initialize } = useTimelineData();
  await initialize();
  event.value = getEventBySlug(route.params.slug);
  loading.value = false;
});
</script>

<template>
  <Teleport to="body">
    <div v-if="!loading" class="full-screen-modal">
      <button @click="$emit('close')">CLOSE</button>
      project slug: {{ slug }}

      {{ event }}

    </div>
  </Teleport>
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
.full-screen-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.5;
  overflow-y: auto;
}
</style>

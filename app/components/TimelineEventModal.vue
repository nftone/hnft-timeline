<template>
  <Teleport to="body">
    <div
      v-if="!loading"
      :class="isMobile ? 'full-screen-modal-mobile' : 'screen-modal'"
    >
      <div class="detail-event">
        <div>
          {{ event.date }}
        </div>
        <div>
          {{ event.name }}
        </div>
        <div>
          <img
            class="image-size"
            :src="`images/events/${event.image}`"
            alt="image of event"
          />
        </div>
      </div>
      <button @click="$emit('close')">CLOSE</button>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, defineProps, ref, computed } from "vue";
import useTimelineData from "../composables/useTimelineData";

const props = defineProps(["slug"]);
const loading = ref(true);
const event = ref(null);

const isMobile = computed(() => {
  const screen = window.innerWidth;
  let screenWidth;
  if (screen < 768) {
    screenWidth = true;
  } else screenWidth = false;
  return screenWidth;
});

onMounted(async () => {
  const { getEventBySlug, initialize } = useTimelineData();
  await initialize();
  event.value = getEventBySlug(props.slug);
  loading.value = false;
});
</script>

<style>
.full-screen-modal-mobile {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
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

.screen-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 40%;
  height: 80%;
  transform: translate(75%, 5%);
  background-color: rgba(0, 0, 0, 0.9);
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

.detail-event {
  text-align: center;
}

.image-size {
  width: 250px;
  height: 250px;
}
</style>

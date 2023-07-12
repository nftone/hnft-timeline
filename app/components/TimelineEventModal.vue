<template>
  <Teleport to="body">
    <div v-if="isMobile">
      <div v-if="!loading" class="full-screen-modal-mobile">
        <button @click="$emit('close')">CLOSE</button>
        <div class="detail-event">
          <br>
          {{event.date}}
          <br>
          {{ event.name }}
          <br>
          <br>
          <img class="image-size" :src="`images/events/${event.image}`">
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!loading" class="screen-modal">
        <button @click="$emit('close')">CLOSE</button>
        <div class="detail-event">
          <br>
          {{event.date}}
          <br>
          {{ event.name }}
          <br>
          <br>
          <img class="image-size" :src="`images/events/${event.image}`">
        </div>
      </div>
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
  return $device.isMobile;
});

onMounted(async () => {
  const { getEventBySlug, initialize } = useTimelineData();
  await initialize();
  event.value = getEventBySlug(props.slug);
  loading.value = false;
});
</script>

<style>
.screen-modal {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(50%, 15%);
  z-index: 9999;
  width: 50%;
  height: 80%;
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

.full-screen-modal-mobile{
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

.detail-event{
  text-align: center;
  font-family: Lato, Helvetica, Arial, sans-serif;
}

.image-size{
  width: 250px;
  height: 250px;
}
</style>

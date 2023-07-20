<template>
  <Teleport to="body">
    <div class="modal-outer" v-on:click="onModalClickOutside">
      <br>
      <div class="close-button" >
        <button class="detail-button" @click="$emit('close')">X</button>
      </div>
      <div
        v-if="!loading"
        :class="isMobile ? 'full-screen-modal-mobile' : 'screen-modal'"
      >
        <div>
          <div>
            {{ event.date }}
          </div>
          <div>
            {{ event.name }}
          </div>
          <div class="detail-image">
            <img
              class="image-size"
              :src="`images/events/${event.image}`"
              alt="image of event"
            />
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, defineProps, ref, computed } from "vue";
import useTimelineData from "../composables/useTimelineData";
import { vOnClickOutside } from '@vueuse/components';

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

const onModalClickOutside = () => {
  context.emit('close');
};

onMounted(async () => {
  const { getEventBySlug, initialize } = useTimelineData();
  await initialize();
  event.value = getEventBySlug(props.slug);
  loading.value = false;

  vOnClickOutside(ref('modalOuter'), onModalClickOutside);
});
</script>

<style>
@import "@/public/css/modal.css";

.image-size {
  width: 250px;
  height: 250px;
  background-color: white;
}


</style>

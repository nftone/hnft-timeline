<template>
  <Teleport to="body">
    <div class="modal-outer">
      <br>
      <div class="close-button" >
        <button class="detail-button-close" @click="$emit('close')">X</button>
      </div>
      <div
        v-if="!loading"
        :class="isMobile ? 'full-screen-modal-mobile' : 'screen-modal'"
      >
        <div>
          <div>
            {{ project.date }}
          </div>
          <div>
            {{ project.name }}
          </div>
          <div v-if="project.description">
            description: {{ project.description }}
          </div>
          <div>
            <img
              class="image-size"
              :src="`images/projects/${project.image}`"
              alt="image of project"
            />
          </div>
          <div v-if="project.creator">creator: {{ project.creator }}</div>
          <div>
            {{ project.network }}
          </div>
          <div class="links">
            <div v-for="link in project.links">
              <nuxt-img
                width="32px"
                class="link-image"
                :src="getLinkTypeImage(link.type)"
              />
              <a :href="link.url" target="_blank">
                {{ link?.name || link.type }}
              </a>
            </div>
          </div>
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
const project = ref(null);

const { getLinkTypeImage } = useTimelineData();

const isMobile = computed(() => {
  const screen = window.innerWidth;
  let screenWidth;
  if (screen < 768) {
    screenWidth = true;
  } else {
    screenWidth = false;
  }
  return screenWidth;
});

onMounted(async () => {
  const { getProjectBySlug, initialize } = useTimelineData();
  await initialize();
  project.value = getProjectBySlug(props.slug);
  loading.value = false;
});
</script>

<style>
@import "@/public/css/modal.css";

.image-size {
  width: 250px;
  height: 250px;

}

.links {
  border: 1px solid red;
  display: grid;
  justify-items: start;
  grid-template-columns: 2fr 1fr;
}
</style>

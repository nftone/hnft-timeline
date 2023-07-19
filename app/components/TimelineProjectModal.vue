<template>
  <Teleport to="body">
    <div
      v-if="!loading"
      :class="isMobile ? 'full-screen-modal' : 'screen-modal'"
    >
      <div class="detail-project">
        <div>
          {{ project.date }}
        </div>

        <div>
          <h2>{{ project.name }}</h2>
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
        <div>
          <div v-for="link in project.links">
            <a :href="link.url">{{ link.name }}</a>
          </div>
        </div>
        <button @click="$emit('close')">CLOSE</button>
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

.detail-project {
  text-align: center;
}

.image-size {
  width: 250px;
  height: 250px;
}

.link {
  margin-right: 40px;
}

.display-link {
  display: flex;
  justify-content: space-between;
}
</style>

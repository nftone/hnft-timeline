<template>
  <div v-if="!loading">
    <h2>
      {{ project.name }}
    </h2>
    <div>
      {{ project.date }}
    </div>
    <div v-if="project.creator">creator: {{ project.creator }}</div>
    <div v-if="project.description">
      {{ project.description }}
    </div>
    <div>
      <img
        class="image-size"
        :src="`images/projects/${project.image}`"
        alt="image of project"
      />
    </div>
    <div class="network">
      <nuxt-img
        width="32px"
        class="link-image"
        :src="getNetworkImage(project.network)"
      />
      Network: {{ project.network }}
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
</template>

<script setup>
import { onMounted, defineProps, ref, computed } from "vue";
import useTimelineData from "../composables/useTimelineData";

const props = defineProps(["slug"]);
const loading = ref(true);
const project = ref(null);

const { getLinkTypeImage, getNetworkImage } = useTimelineData();

onMounted(async () => {
  const { getProjectBySlug, initialize } = useTimelineData();
  await initialize();
  project.value = getProjectBySlug(props.slug);
  loading.value = false;
});
</script>

<style>
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

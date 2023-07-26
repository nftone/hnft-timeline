<template>
  <div class="project-container-main">
    <nuxt-link :to="`/project/${project.slug}`">
      <div class="project-container">
        <div class="project-network-container">
          <nuxt-img
            v-if="!project.placeholder"
            class="network-image"
            :src="getNetworkImage(project.network)"
          />
        </div>
        <div class="project-image-container">
          <nuxt-img
            v-if="!project.placeholder"
            class="network-image"
            :src="`images/projects/${project.image}`"
          />
        </div>
        <div class="project-content-container">
          <div>{{ project.name }}</div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
import useTimelineData from "../composables/useTimelineData";
const props = defineProps(["project"]);
const { getNetworkImage } = useTimelineData();
</script>

<style>
.project-container {
  display: grid;
  grid-template-columns: 20px 30px auto;
  padding: 4px 4px;
}

.project-network-container {
  display: grid;
  grid-column: 1;
  justify-items: center;
  margin: auto;
}

.project-image-container {
  display: grid;
  grid-column: 2;
  justify-items: center;
}

.project-content-container {
  cursor: pointer;
  display: grid;
  grid-column: 3;
  align-items: center;
  font-size: 14px;
  padding: 0 4px;
}

.network-image {
  border-radius: 8px;
  width: 16px;
}
</style>

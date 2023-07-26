<template>
  <div class="project-container-main">
    <nuxt-link :to="`/project/${project.slug}`">
      <div class="project-container">
        <div class="project-image-container">
          <nuxt-img
            height="50px"
            width="50px"
            v-if="!project.placeholder"
            :src="`images/projects/${project.image}`"
          />
        </div>
        <div class="project-content-container">
          <div>{{ project.name }}</div>
        </div>
        <div class="project-network-container">
          <nuxt-img
            v-if="!project.placeholder"
            class="network-image"
            :src="getNetworkImage(project.network)"
          />
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
  height: 50px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50px auto 20px;
}

.project-network-container {
  display: grid;
  justify-items: center;
  margin: auto;
}

.project-image-container {
  height: 50px;
  display: grid;
  justify-items: center;
}

.project-image-container img {
  border-radius: 4px 0 0 4px;
}

.project-content-container {
  cursor: pointer;
  display: grid;
  align-items: center;
  font-size: 14px;
  padding-left: 8px;
}

.network-image {
  border-radius: 4px;
  width: 16px;
}
</style>

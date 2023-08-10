<template>
  <div class="project-container-main">
    <nuxt-link :to="`/project/${project.slug}`">
      <div class="project-container">
        <div class="project-image-container">
          <nuxt-img
            height="50px"
            width="50px"
            :alt="`Image of project ${project.name}`"
            :src="`images/projects/${project.image}`"
          />
        </div>
        <div class="project-content-container">
          <div>{{ project.name }}</div>
        </div>
        <div class="project-network-container">
          <nuxt-img
            class="network-image"
            width="22px"
            height="22px"
            :alt="`Network image of project ${project.name}`"
            :src="getNetworkImage(project.network)"
          />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import useTimelineData from "../composables/useTimelineData"
defineProps<{ project: TimelineProject }>()
const { getNetworkImage } = useTimelineData(useRoute())
</script>

<style>
.project-container {
  height: 50px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50px auto 35px;
}

.project-network-container {
  display: grid;
  justify-items: center;
  align-items: center;
}

.project-image-container {
  height: 50px;
  display: grid;
  justify-items: center;
  align-items: center;
}

/* @TODO: There should be a generic class for the main project and event image */
.project-image-container img {
  width: 40px;
  height: 40px;
}

.project-content-container {
  cursor: pointer;
  display: grid;
  align-items: center;
  font-size: 14px;
  padding-left: 8px;
  overflow-wrap: anywhere;
}

.network-image {
  border-radius: 50%;
}
</style>

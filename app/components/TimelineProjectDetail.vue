<template>
  <div v-if="!loading">
    <h2>
      {{ project.name }}
    </h2>
    <div>
      <nuxt-img
        class="image-size"
        :src="`images/projects/${project.image}`"
        alt="image of project"
      />
    </div>
    <div>
      <div class="subheader">Date</div>
      {{ project.date }}
    </div>
    <div v-if="project.creator" class="subheader">Creator</div>
    <div v-if="project.creator">{{ project.creator }}</div>
    <div v-if="project.description" class="subheader">Description</div>
    <div class="description" v-if="project.description">
      {{ project.description }}
    </div>
    <div class="network">
      <nuxt-img
        width="32px"
        class="link-image"
        :src="getNetworkImage(project.network)"
      />
      <div class="networkname">{{ project.network }}</div>
    </div>
    <div class="links">
      <div v-for="link in project.links">
        <a :href="link.url" target="_blank">
          <nuxt-img
            width="32px"
            class="link-image"
            :src="getLinkTypeImage(link.type)"
          />
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
  max-width: 250px;
  margin-bottom: 0.5rem;
  width: 100%;
  border-radius: 4px;
}

.links {
  margin-top: 1rem;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(32px, 1fr));
}
</style>

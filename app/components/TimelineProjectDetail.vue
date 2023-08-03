<template>
  <div>
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
    <div v-if="project.creator">
      {{ project.creator }}
    </div>
    <div v-if="project.description" class="subheader">Description</div>
    <div v-if="project.description" class="description">
      {{ project.description }}
    </div>
    <div class="network">
      <nuxt-img
        width="32px"
        class="link-image"
        :src="getNetworkImage(project.network)"
      />
      <div class="network-name">
        {{ project.name }}
      </div>
    </div>
    <div class="links">
      <div v-for="link in project.links" :key="`${slug}-link-${link}`">
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

<script setup lang="ts">
import useTimelineData from "../composables/useTimelineData"

const props = defineProps<{ slug: string }>()

const { getLinkTypeImage, getProjectBySlug, getNetworkImage } = useTimelineData(
  useRoute()
)

const project = getProjectBySlug(props.slug)
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

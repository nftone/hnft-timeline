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
        :alt="`Image of project ${project.name}`"
        :src="getNetworkImage(project.network)"
      />
      <div class="network-name">
        {{ getNetworkName(project.network) }}
      </div>
    </div>
    <div class="links">
      <div
        v-for="link in project.links"
        :key="`${slug}-link-${link}`"
        class="link"
      >
        <a :href="link.url" target="_blank">
          <nuxt-img
            width="32px"
            class="link-image"
            :alt="`Network image of project ${project.name}`"
            :src="getLinkTypeImage(link.type)"
          />
        </a>
        <span>
          {{ link?.name || link.type }}
        </span>
      </div>
    </div>
    <div class="contribute mt-2">
      <button @click="editModalIsOpen = true">Propose changes</button>
    </div>
  </div>

  <Modal v-if="editModalIsOpen" @close="editModalIsOpen = false">
    <TimelineProjectEditModal :project="project" />
  </Modal>
</template>

<script setup lang="ts">
import useTimelineData from "../composables/useTimelineData"

const props = defineProps<{ slug: string }>()
const editModalIsOpen = ref(false)

const {
  getLinkTypeImage, //
  getProjectBySlug,
  getNetworkImage,
  getNetworkName,
} = useTimelineData(useRoute())

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

.links .link {
  display: grid;
  grid-auto-flow: row;
}
</style>

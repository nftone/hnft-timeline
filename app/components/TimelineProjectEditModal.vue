<template>
  <div class="edit-form">
    <h2>
      {{ project.name }}
    </h2>

    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="updatedProject.name"
        type="text"
        placeholder="Name"
      />

      <label for="slug">Slug</label>
      <input
        id="slug"
        v-model="updatedProject.slug"
        type="text"
        placeholder="Slug"
      />

      <label for="date">Date</label>
      <input
        id="date"
        v-model="updatedProject.date"
        type="text"
        placeholder="Date"
      />

      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="updatedProject.description"
        type="text"
        placeholder="Description"
        rows="6"
      />

      <label for="image">Creator</label>
      <input
        id="creator"
        v-model="updatedProject.creator"
        type="text"
        placeholder="Creator"
      />
    </div>

    <h3 class="mt-2 mb-1">Links</h3>

    <div v-for="(link, index) in updatedProject.links" :key="index">
      <div class="form-group link-form mb-1 pa-1">
        <div class="link-form-two-inputs">
          <div class="input-cell">
            <label>Link type *</label>
            <select v-model="link.type">
              <option
                v-for="linkType in taxonomy.linkTypes"
                :key="linkType.name"
                :value="linkType.name"
              >
                {{ linkType.name }}
              </option>
            </select>
          </div>

          <div class="input-cell">
            <label>Link name</label>
            <input
              v-model="link.name"
              type="text"
              placeholder="Official Website"
            />
          </div>
        </div>

        <div class="input-cell">
          <label>URL *</label>
          <input v-model="link.url" type="text" placeholder="Link URL" />
        </div>

        <button
          v-if="updatedProject.links.length > 1"
          @click="updatedProject.links.splice(index, 1)"
        >
          Delete link
        </button>
      </div>
    </div>

    <button @click="updatedProject.links.push({ type: '', url: '' })">
      Add link
    </button>

    <h3 class="mt-2 mb-1">Updated data object to paste in GitHub</h3>

    <div class="json-object pa-1">
      <pre><code>{{ updatedProject }}</code></pre>
    </div>

    <div class="actions mt-2 mb-1">
      <button @click="copy(JSON.stringify(updatedProject, null, '  '))">
        Copy data object to clipboard
      </button>

      <a
        :href="getProjectContributionUrl(project)"
        target="_blank"
        rel="noopener noreferrer"
        class="ml-1"
        style="text-decoration: underline"
        >and propose changes on GitHub
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useTimelineData from "../composables/useTimelineData"
import TimelineProjectDataFactory from "../factories/TimelineProjectDataFactory"

const { getProjectContributionUrl, taxonomy } = useTimelineData(useRoute())

const props = defineProps<{ project: TimelineProject }>()

const initialProjectData = TimelineProjectDataFactory.fromTimelineProject(
  props.project
)

const updatedProject = ref<TimelineProjectData>(initialProjectData)

const { copy } = useClipboard()
</script>

<style>
.edit-form {
  width: 100%;
  display: grid;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.form-group label {
  font-weight: bold;
}

.form-group.link-form {
  border: 1px solid var(--yellow-event);
  grid-template-rows: 1fr 1fr;
}

.link-form .input-cell {
  display: grid;
  grid-auto-flow: row;
}

.link-form-two-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

.json-object {
  border: 1px solid var(--yellow-event);
  text-align: left;
  grid-column: 1 / -1;
}

.json-object pre {
  white-space: pre-wrap;
}
</style>

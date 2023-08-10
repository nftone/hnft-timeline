<template>
  <Timeline />

  <Modal @close="() => router.push({ path: '/' })">
    <TimelineEventDetail :slug="route.params.event" />
  </Modal>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"

import Timeline from "~/components/Timeline.vue"
import Modal from "../../components/Modal.vue"
import TimelineEventDetail from "../../components/TimelineEventDetail.vue"

const route = useRoute()
const router = useRouter()
</script>

<style>
.timeline-container a {
  color: var(--white-text);
}
</style>

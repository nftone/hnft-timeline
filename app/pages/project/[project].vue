<template>
  <Timeline />

  <Modal @close="() => router.push({ path: '/' })">
    <TimelineProjectDetail :slug="route.params.project" />
  </Modal>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"

import Timeline from "~/components/Timeline.vue"
import Modal from "../../components/Modal.vue"
import TimelineProjectDetail from "../../components/TimelineProjectDetail.vue"

const route = useRoute()
const router = useRouter()
</script>

<style>

</style>

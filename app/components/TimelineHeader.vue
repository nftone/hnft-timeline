<template>
  <div class="header-container">
    <div class="title">
      <h1 class="timeline-title">HNFT Timeline</h1>
    </div>
    <div class="filter-container">
      <div class="select-container">
        <select id="network-filter" v-model="selectedNetwork">
          <option value="">All network</option>
          <option v-for="network in networks" :key="network.name" :value="network.slug">
            {{network.name}}
          </option>
        </select>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router"
import { ref, watch } from "vue"
import useTimelineData from "../composables/useTimelineData"

const router = useRouter()
const route = useRoute()

const { networks } = useTimelineData(route);
const initialNetworkFilter = String(route.query?.network || "")
const selectedNetwork = ref(initialNetworkFilter)

const onNetworkFilterChanged = (network: string) => {
  const query: any = {}

  if (network !== "") query.network = network

  router.push({
    path: "/",
    query,
  })
}

watch(selectedNetwork, async (newValue: string) => {
  onNetworkFilterChanged(newValue)
})
</script>

<style>
.header-container {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: baseline;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #252525;
}

.title {
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.title h1 {
  font-size: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.filter-container {
  padding-right: 2rem;
}

.select-container select {
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  font-size: 14px;
  border: 2px solid var(--grey);
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
}

.select-container select:focus {
  border-color: var(--yellow-event);
}

</style>

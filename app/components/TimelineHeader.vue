<template>
  <div class="header">
    <nuxt-img
      width="150px"
      :src="`/images/HNFT_Logo.svg`"
      alt="Historical NFT Timeline logo"
    />
    <div class="filter-container">
      <div class="select-container">
        <select id="network-filter" v-model="selectedNetwork">
          <option value="">All networks</option>
          <option
            v-for="network in networks"
            :key="network.name"
            :value="network.slug"
          >
            {{ network.name }}
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

const { networks } = useTimelineData(route)
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
.header {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: baseline;
  margin: 1rem;
}

.title img {
  place-self: center;
}

.filter-container {
  place-self: center;
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

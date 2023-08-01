<template>
  <div class="header-container">
    <div class="title">
      <h1 class="timeline-title">HNFT Timeline</h1>
    </div>
    <div class="filter-container">
      <select id="network-filter" v-model="selectedNetwork">
        <option value="">All</option>
        <option value="Counterparty">Counterparty</option>
        <option value="Dogeparty">Dogeparty</option>
        <option value="Ethereum">Ethereum</option>
        <option value="Ethereum Classic">Ethereum Classic</option>
        <option value="Namecoin">Namecoin</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router"
import { ref, watch } from "vue"

const router = useRouter()
const route = useRoute()

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
  flex-direction: column;
  justify-content: center;
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
  margin-top: 1rem;
  color: #fff;
}
</style>

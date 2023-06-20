<template>
  <div class="buy-container">
    <div
      v-if="!showBuyModal"
      class="circled-link-desktop"
      @click="showBuyModal = true"
    >
      Buy
    </div>
    <Teleport to="body">
      <BuyModal :show="showBuyModal" @close="showBuyModal = false" />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BuyModal from "@/components/BuyModal.vue";
const showBuyModal = ref(false);
</script>

<style>
.buy-container {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-auto-flow: row;
  place-content: center;
  overflow: hidden;
}
</style>

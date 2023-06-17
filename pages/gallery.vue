<template>
  <div class="gallery-container">
    <div class="assets-container">
      <div
        class="asset-container"
        v-for="(asset, i) in displayedAssets"
        :key="`asset-${i}-${asset.tokenId}`"
      >
        <img :src="`/images/${asset.image}`" :alt="asset.image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useGallery from "@/composables/useGallery";
const { displayedAssets } = useGallery();
</script>

<style>
.gallery-container {
  margin-top: 154px;
  padding: 30px;
}

.assets-container {
  display: grid;
  row-gap: 16px;
}

.asset-container {
  display: grid;
  place-content: center;
  width: 100%;
  overflow: hidden;
}

.asset-container img {
  /* max-width: 260px; */
  width: 100%;
}
</style>

<template>
  <div class="gallery-container">
    <div class="assets-container">
      <TransitionGroup name="spring">
        <div
          class="asset-container"
          v-for="(asset, i) in displayedAssets"
          :key="`asset-${i}-${asset.tokenId}`"
        >
          <img :src="getImageUrl(asset.image)" :alt="asset.image" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import useGallery from "@/composables/useGallery";
const { displayedAssets } = useGallery();

const getImageUrl = (image) => {
  if (window.location.href.includes("github.io")) {
    return `/outlawz-website/images/${image}`;
  }
  return `/images/${image}`;
};
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

@media (min-width: 640px) {
  .assets-container {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 16px;
  }

  .gallery-container {
    margin-left: 220px;
  }
}

@media (min-width: 900px) {
  .assets-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: max-content;
    float: right;
    margin-right: 26px;
  }
}

/* spring transition */
.spring-enter-active,
.spring-leave-active {
  transition: all 0.3s ease;
}

.spring-enter-from,
.spring-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

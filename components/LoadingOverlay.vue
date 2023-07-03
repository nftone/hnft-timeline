<template>
  <div class="loading-overlay">
    <div class="loader" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
.loading-overlay {
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  place-items: center;
  opacity: 0.75;
}

.loader {
  margin: auto;
  border: 10px solid var(--primary-color);
  border-radius: 50%;
  border-top: 10px solid var(--primary-color);
  width: 100px;
  height: 100px;
  animation: spinner 750ms linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

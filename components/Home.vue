<template>
  <div id="home-section">
    <img
      class="logo-character"
      src="~assets/images/logoCharacter.png"
      alt="Outlawz logo"
    />
    <img
      v-if="!isDark"
      class="text-logo"
      src="~assets/images/logoFont.png"
      alt="Outlawz text logo"
    />
    <img
      v-if="isDark"
      class="text-logo"
      src="~assets/images/logoFontWhite.png"
      alt="Outlawz text logo"
    />
  </div>

  <div class="buy-cta-section">
    <div class="circled-link grayed">Buy</div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();
</script>

<style>
#home-section {
  z-index: 1;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  align-content: center;
}

.buy-cta-section {
  z-index: 2;
  position: absolute;
  bottom: 25px;
  width: 100%;
}

.logo-character {
  width: 100%;
  max-width: 110px;
  margin-bottom: 8px;
}

.text-logo {
  width: 100%;
  max-width: 173px;
}
</style>

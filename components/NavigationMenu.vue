<template>
  <div>
    <div>Home</div>
    <div>The artist</div>
    <div>Team</div>
    <div>Gallery</div>
    <div>Buy</div>
    <div>More</div>
    <div>References</div>
    <div>License agreement</div>
    <div>Terms & Conditions</div>
    <div>Discord</div>
    <div>Twitter</div>
  </div>

  <div>
    <img
      @click="toggleDark()"
      v-if="isDark"
      src="~/assets/images/lightMode.png"
    />
    <img
      @click="toggleDark()"
      v-if="!isDark"
      src="~/assets/images/darkMode.png"
    />
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

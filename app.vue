<template>
  <NavigationMenu />
  <router-view />
</template>

<script setup>
import { useDark } from "@vueuse/core";

useDark({
  selector: "body",
  attribute: "theme",
  valueDark: "dark-theme",
});
</script>

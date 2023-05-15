<template>
  <div>
    <NavigationMenu />
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";

const isDark = useDark({
  selector: "body", //element to add attribute to
  attribute: "theme", // attribute name
  valueDark: "custom-dark", // attribute value for dark mode
  valueLight: "custom-light", // attribute value for light mode
});
</script>

<style>
[theme="custom-dark"] {
  background: #16171d;
  color: #fff;
}
</style>

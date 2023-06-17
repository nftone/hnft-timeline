<template>
  <img
    v-if="isDark && !props.isExpanded"
    src="~/assets/images/triangleIconDark.png"
  />
  <img
    v-if="isDark && props.isExpanded"
    src="~/assets/images/triangleIconDownDark.png"
  />
  <img
    v-if="!isDark && !props.isExpanded"
    src="~/assets/images/triangleIconLight.png"
  />
  <img
    v-if="!isDark && props.isExpanded"
    src="~/assets/images/triangleIconDownLight.png"
  />
</template>

<script setup>
import { defineProps } from "vue";
import { useDark } from "@vueuse/core";
const props = defineProps({ isExpanded: Boolean });
const isDark = useDark();
</script>

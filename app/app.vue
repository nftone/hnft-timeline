<template>
  <TimelineHeader />
  <router-view :key="route.fullPath" />
  <TimelineFooter />
</template>

<script setup>
// TODO: This is a hack
// We should not have to do this to re-render the app on query param change
import { useRoute } from "vue-router"
const route = useRoute()
</script>

<style>
:root {
  --modal-background: rgba(0, 0, 0, 0.7);
  --white-text: #fff;
  --dark: #252525;
  --grey: #656565;
  --yellow-event: rgb(217, 196, 0);
}

html {
  font-family: Lato, Helvetica, Arial, sans-serif;
  color: white;
}

a {
  color: white;
  text-decoration: none;
}

a:visited {
  color: white;
}

a:hover {
  color: white;
}

body {
  margin: 0;
}
</style>

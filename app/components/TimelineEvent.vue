<template>
  <div class="main-event-container">
    <nuxt-link :to="`/event/${event.slug}`">
      <div class="overview-event-container">
        <div class="event-image-container">
          <nuxt-img
              class="event-image"
              :src="`images/events/${event.image}`"
              :alt="`Image of event ${event.name}`"
          />
        </div>
        <div class="event-name-container">
          <div>
            {{ event.name }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

defineProps<{ event: TimelineEvent }>()
</script>

<style>
.main-event-container {
  border-radius: 4px;
  background: var(--yellow-event);
}

.overview-event-container {
  display: grid;
  place-items: center;
  grid-template-columns: 50px auto;
}

.event-name-container {
  cursor: pointer;
  display: grid;
  align-items: center;
  font-size: 14px;
  padding: 0 4px;
  font-weight: 700;
  text-transform: capitalize;
  place-self: normal;
}

.event-image-container {
  display: grid;
  justify-items: center;
}

.event-image {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
</style>

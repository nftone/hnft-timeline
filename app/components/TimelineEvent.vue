<template>
  <div class="main-event-container">
    <nuxt-link :to="`?event=${item.slug}`">
      <div class="overview-event-container">
        <div class="event-image-container">
          <nuxt-img class="event-image" :src="`images/events/${item.image}`" />
        </div>
        <div class="event-name-container">
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { getDateStringFromDate } from "../services/dateHelpers";
import { CDN_URL } from "../constants/appConstants";
import RocketIcon from "./icons/IconRocket.vue";

export default {
  components: {
    RocketIcon,
  },

  props: ["item"],

  data: () => ({
    expanded: false,
    CDN_URL,
  }),

  computed: {
    launchDate() {
      return getDateStringFromDate(new Date(this.item.date));
    },

    isDate() {
      return this.item.date;
    },
  },
};
</script>

<style>
.main-event-container {
  padding: 4px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

</style>

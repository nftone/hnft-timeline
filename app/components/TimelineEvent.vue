<template>
  <div class="main-event-container">
    <div class="overview-event-container">
      <div class="event-image-container">
        <nuxt-img class="event-image" :src="`images/evts/$en{item.image}`" />
      </div>
      <div class="event-name-container" @click="expanded = !expanded">
        <div>
          <nuxt-link :to="`?event=${item.slug}`">{{ item.name }}</nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="expanded" class="event-card-secondary-container">
      <div v-if="isDate">
        <div class="event-link">
          <RocketIcon />
          <span class="date">{{ launchDate }}</span>
        </div>
      </div>
    </div>
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
  background: rgb(217, 196, 0);
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

.event-card-secondary-container {
  padding: 8px;
}

.event-link {
  margin: 4px 0;
  display: grid;
  grid-template-columns: 30px auto;
  font-size: 14px;
}

.event-link:first-child {
  margin-top: 0;
  border-top: #bebebe 1px dashed;
  padding: 4px 0 2px 0;
}

.date {
  margin: auto 2px;
  font-size: 13px;
}
</style>

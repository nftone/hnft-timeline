<template>
  <div class="item-container-main">
    <nuxt-link :to="`?project=${item.slug}`">
      <div class="item-container">
        <div class="item-network-container">
          <nuxt-img
            v-if="!item.placeholder"
            class="network-image"
            :src="`${CDN_URL}/networks/${item.network}.jpg`"
          />
          <!--
          <nuxt-img
              v-if="!item.placeholder"
              class="network-image"
              :src="getNetworkImage(item.network)"
          /> -->

        </div>
        <div class="item-image-container">
          <nuxt-img
            v-if="!item.placeholder"
            class="network-image"
            :src="`images/projects/${item.image}`"
          />
        </div>
        <div class="item-content-container">
          <div>{{ item.name }}</div>
        </div>
      </div>


    </nuxt-link>
  </div>
</template>


<script>

import { CDN_URL } from "../constants/appConstants";
import { getDateStringFromDate } from "../services/dateHelpers";
import DiscordIcon from "./icons/DiscordIcon.vue";
import ExplorerIcon from "./icons/IconExplorer.vue";
import RocketIcon from "./icons/IconRocket.vue";
import useTimelineData from "../composables/useTimelineData";

const { getNetworkImage } = useTimelineData();


export default {
  components: {
    RocketIcon,
    DiscordIcon,
    ExplorerIcon,
  },

  props: ["item"],

  data: () => ({
    expanded: false,
    CDN_URL,
  }),

  computed: {
    links() {
      if (this.item.placeholder) return {};
      return this.item.links;
    },

    explorer() {
      const id = this.links?.explorer;
      if (!id) return null;
      return `/explorer/?pa=1&co=${id}&sb=n&sd=a`;
    },

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
.item-container {
  display: grid;
  grid-template-columns: 20px 30px auto;
  padding: 4px 4px;
}

.item-network-container {
  display: grid;
  grid-column: 1;
  justify-items: center;
  margin: auto;
}

.item-image-container {
  display: grid;
  grid-column: 2;
  justify-items: center;
}

.item-content-container {
  cursor: pointer;
  display: grid;
  grid-column: 3;
  align-items: center;
  font-size: 14px;
  padding: 0 4px;
}

.network-image {
  border-radius: 8px;
  width: 16px;
}
</style>

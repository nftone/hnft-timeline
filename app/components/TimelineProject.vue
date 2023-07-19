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

          <nuxt-img
            v-if="!item.placeholder"
            class="network-image"
            :src="`images/projects/${item.network}.jpg`"
          />
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

      <div v-if="expanded">
        <div v-if="isDate" class="item-card-secondary-container">
          <div class="item-link">
            <RocketIcon />
            <span class="date">{{ launchDate }}</span>
          </div>
          <div v-if="discordChannel" class="item-link">
            <a :href="discordChannel" target="_blank" rel="noopener noreferrer">
              <DiscordIcon />
            </a>
            <a
              :href="discordChannel"
              target="_blank"
              rel="noopener noreferrer"
              class="clickable-link"
            >
              Join our discord to learn more about this project
            </a>
          </div>
          <div v-if="explorer" class="item-link">
            <a :href="explorer" target="_blank" rel="noopener noreferrer">
              <ExplorerIcon />
            </a>
            <a
              :href="explorer"
              target="_blank"
              rel="noopener noreferrer"
              class="clickable-link"
            >
              HNFT
            </a>
          </div>
          <div v-if="oldNft">
            <a
              :href="oldNft"
              target="_blank"
              rel="noopener noreferrer"
              class="clickable-link"
            >
              See it on OldNFT
            </a>
          </div>
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

    discordChannel() {
      return this.links?.channel;
    },

    explorer() {
      const id = this.links?.explorer;
      if (!id) return null;
      return `/explorer/?pa=1&co=${id}&sb=n&sd=a`;
    },

    oldNft() {
      return this.links?.oldNft;
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

.item-card-secondary-container {
  padding: 8px;
  border-radius: 4px;
}

.item-link {
  margin: 5px 0;
  display: grid;
  grid-template-columns: 30px auto;
  color: #bebebe;
  font-size: 14px;
  align-items: center;
}

.item-link:first-child {
  margin-top: 0;
  border-top: #bebebe 1px dashed;
  padding: 10px 0 0px 0;
}

.item-link:last-child {
  margin-bottom: 0;
}

.item-image {
  width: 25px;
  height: 25px;
  border-radius: 4px;
}

.network-image {
  border-radius: 8px;
  width: 16px;
}

.date {
  margin: auto 2px;
}

.clickable-link {
  margin: auto 2px;
  font-size: 13px;
}
</style>

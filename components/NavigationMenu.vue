<template>
  <Transition name="slide-fade">
    <div v-if="isMenuExpanded" id="blur-overlay"></div>
  </Transition>

  <div id="navigation-menu">
    <div class="circled-link" @click="toggleMenuExpansion()">Menu</div>

    <Transition name="slide-fade">
      <div class="submenu" v-if="isMenuExpanded">
        <div>
          <NuxtLink :to="{ path: '/' }" @click="() => toggleMenuExpansion()">
            Home
          </NuxtLink>
        </div>
        <div>
          <NuxtLink
            :to="{ path: '/', hash: '#the-artist' }"
            @click="() => toggleMenuExpansion()"
          >
            The artist
          </NuxtLink>
        </div>
        <div>
          <NuxtLink
            :to="{ path: '/', hash: '#team' }"
            @click="() => toggleMenuExpansion()"
          >
            Team
          </NuxtLink>
        </div>
        <div class="grayed"><NuxtLink to="gallery">Gallery</NuxtLink></div>
        <div class="grayed"><NuxtLink>Buy</NuxtLink></div>
        <div class="circled-link" @click="toggleMoreExpansion()">More</div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div class="submenu" v-if="isMenuExpanded && isMoreExpanded">
        <div>
          <NuxtLink to="references">References</NuxtLink>
        </div>
        <div>
          <NuxtLink to="license-agreement">License agreement</NuxtLink>
        </div>
        <div>
          <NuxtLink to="terms-and-conditions">Terms & Conditions</NuxtLink>
        </div>
        <div>
          <NuxtLink to="https://discord.com" target="_blank">Discord</NuxtLink>
        </div>
        <div>
          <NuxtLink to="https://twitter.com" target="_blank">Twitter</NuxtLink>
        </div>
      </div>
    </Transition>

    <div id="dark-mode-toggle">
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

    <div class="connect-button-section">
      <div class="connect-button circled-link grayed">Connect</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isMenuExpanded = ref(false);
const isMoreExpanded = ref(false);

const toggleMenuExpansion = useToggle(isMenuExpanded);
const toggleMoreExpansion = useToggle(isMoreExpanded);
</script>

<style>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

#blur-overlay {
  z-index: 3;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: var(--background-color);
}

#navigation-menu {
  z-index: 4;
  position: fixed;
  font-family: "Next Book";
  font-weight: 400;
  font-size: 14px;
  top: 0;
  padding: 25px 0 18px 0;
  width: 100%;
  display: grid;
  text-align: center;
  text-transform: uppercase;
  row-gap: 14px;
  background-color: var(--background-color);
}

.connect-button-section {
  display: grid;
  position: absolute;
  z-index: 2;
  top: 70px;
  place-items: center;
  background-color: var(--background-color);
  width: 100%;
  padding-bottom: 18px;
}

.connect-button {
  place-self: center;
}

.submenu {
  display: grid;
  z-index: 3;
  text-align: center;
  text-transform: uppercase;
  row-gap: 14px;
  background-color: var(--background-color);
}

#dark-mode-toggle {
  z-index: 3;
  position: fixed;
  right: 30px;
  top: 30px;
}

#dark-mode-toggle img {
  width: 16px;
  height: 16px;
}
</style>

<template>
  <div v-if="largerThanMd" id="navigation-menu-desktop">
    <div class="left-section">
      <div :class="`${currentSection === pageSections.home ? '' : 'blurable'}`">
        <NuxtLink :to="{ path: '/' }" @click="() => toggleMenuExpansion()">
          Home
        </NuxtLink>
      </div>
      <div
        :class="`${
          currentSection === pageSections['the-artist'] ? '' : 'blurable'
        }`"
      >
        <NuxtLink
          :to="{ path: '/', hash: '#the-artist' }"
          @click="() => toggleMenuExpansion()"
        >
          The artist
        </NuxtLink>
      </div>

      <div
        :class="`${currentSection === pageSections['team'] ? '' : 'blurable'}`"
      >
        <NuxtLink
          :to="{ path: '/', hash: '#team' }"
          @click="() => toggleMenuExpansion()"
        >
          Team
        </NuxtLink>
      </div>
      <div class="grayed blurable"><NuxtLink>Gallery</NuxtLink></div>
      <div class="grayed blurable"><NuxtLink>Buy</NuxtLink></div>
    </div>

    <div class="right-section">
      <div>
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

      <div class="blurable">
        <NuxtLink to="https://linktr.ee/lugosis" target="_blank">
          References
        </NuxtLink>
      </div>

      <div class="desktop-menu legal-menu grayed blurable">
        <div>Legal</div>

        <Transition name="slide-fade">
          <div class="desktop-submenu legal-submenu">
            <NuxtLink class="desktop-submenu-item">
              <div class="grayed circled-link">License&nbsp;agreement</div>
            </NuxtLink>
            <NuxtLink class="desktop-submenu-item">
              <div class="grayed circled-link">
                Terms&nbsp;&&nbsp;Conditions
              </div>
            </NuxtLink>
          </div>
        </Transition>
      </div>

      <div class="desktop-menu social-menu grayed blurable">
        <div>Socials</div>

        <Transition name="slide-fade">
          <div class="desktop-submenu social-submenu">
            <NuxtLink
              to="https://discord.com"
              target="_blank"
              class="desktop-submenu-item"
            >
              <div class="grayed circled-link">Discord</div>
            </NuxtLink>
            <NuxtLink
              to="https://twitter.com"
              target="_blank"
              class="desktop-submenu-item"
            >
              <div class="grayed circled-link">Twitter</div>
            </NuxtLink>
          </div>
        </Transition>
      </div>

      <div class="grayed blurable">
        <NuxtLink>Connect</NuxtLink>
      </div>
    </div>
  </div>

  <div v-else id="navigation-menu">
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
        <div class="grayed"><NuxtLink>Gallery</NuxtLink></div>
        <div class="grayed"><NuxtLink>Buy</NuxtLink></div>
        <div class="circled-link" @click="toggleMoreExpansion()">More</div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div class="submenu" v-if="isMenuExpanded && isMoreExpanded">
        <div>
          <NuxtLink to="https://linktr.ee/lugosis" target="_blank">
            References
          </NuxtLink>
        </div>
        <div class="grayed">
          <NuxtLink>License agreement</NuxtLink>
        </div>
        <div class="grayed">
          <NuxtLink>Terms & Conditions</NuxtLink>
        </div>
        <div>
          <NuxtLink to="https://discord.com" target="_blank">Discord</NuxtLink>
        </div>
        <div>
          <NuxtLink to="https://twitter.com" target="_blank">Twitter</NuxtLink>
        </div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div class="submenu traits-submenu" v-if="areTraitsExpanded">
        <TraitsMenu />
      </div>
    </Transition>

    <div v-if="isGallery" id="back-button">
      <NuxtLink :to="{ path: '/' }">
        <img v-if="isDark" src="~/assets/images/backButtonDark.png" />
        <img v-if="!isDark" src="~/assets/images/backButtonLight.png" />
      </NuxtLink>
    </div>

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

    <div v-if="isGallery" class="traits-button-section">
      <div class="traits-button circled-link" @click="toggleTraitsExpansion()">
        Traits
      </div>
    </div>
  </div>

  <div v-if="largerThanMd && isGallery" id="traits-menu-section">
    <TraitsMenu />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import TraitsMenu from "@/components/TraitsMenu.vue";

import useScrollPosition, {
  pageSections,
} from "@/composables/useScrollPosition";

const { currentSection } = useScrollPosition();
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDark = useDark();
const route = useRoute();
const toggleDark = useToggle(isDark);

const largerThanMd = breakpoints.greater("md");
const medium = breakpoints.between("md", "xl");

const isMenuExpanded = ref(false);
const isMoreExpanded = ref(false);
const areTraitsExpanded = ref(false);

const toggleMenuExpansion = useToggle(isMenuExpanded);
const toggleMoreExpansion = useToggle(isMoreExpanded);
const toggleTraitsExpansion = useToggle(areTraitsExpanded);

const isGallery = computed(() => route.path.includes("/gallery"));

watch(areTraitsExpanded, (value) => {
  if (value) isMenuExpanded.value = false;
});

watch(isMenuExpanded, (value) => {
  if (value) areTraitsExpanded.value = false;
});
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
  font-size: 12px;
  top: 0;
  padding: 25px 0 18px 0;
  width: 100%;
  display: grid;
  text-align: center;
  text-transform: uppercase;
  row-gap: 14px;
  background-color: var(--background-color);
}

#navigation-menu .circled-link,
#navigation-menu-desktop .circled-link {
  font-size: 12px;
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

.traits-button-section {
  display: grid;
  position: absolute;
  z-index: 2;
  top: 114px;
  place-items: center;
  background-color: var(--background-color);
  width: 100%;
  padding-bottom: 22px;
}

.connect-button,
.traits-button {
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

.traits-submenu {
  margin-top: 94px;
}

#back-button {
  z-index: 3;
  position: fixed;
  left: 30px;
  top: 30px;
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

#navigation-menu-desktop {
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  padding: 20px 0;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  background-color: var(--background-color);
}

#navigation-menu-desktop .left-section,
#navigation-menu-desktop .right-section {
  display: grid;
  grid-auto-flow: column;
  place-content: center;
}

#navigation-menu-desktop .left-section div,
#navigation-menu-desktop .right-section div {
  display: grid;
  place-content: center;
  padding: 0 16px;
  cursor: pointer;
  height: 50px;
}

#navigation-menu-desktop .left-section:first-child {
  margin-left: 4px;
}

#navigation-menu-desktop .right-section:last-child {
  margin-right: 4px;
}

@media (min-width: 840px) {
  #navigation-menu-desktop .left-section:first-child {
    margin-left: 40px;
  }

  #navigation-menu-desktop .right-section:last-child {
    margin-right: 40px;
  }
}

#navigation-menu-desktop .left-section {
  justify-self: left;
}

#navigation-menu-desktop .right-section {
  justify-self: right;
}

.blurable {
  filter: blur(2px);
}

.blurable:hover {
  filter: blur(0);
}

.blurable {
  transition: filter 0.3s;
}

/* Absolute on left */
#traits-menu-section {
  position: absolute;
  left: 0;
  top: 186px;
  width: 220px;
  height: 100%;
}

.social-submenu,
.legal-submenu {
  display: none !important;
}

.social-submenu .circled-link {
  width: unset;
}

.legal-menu:hover .legal-submenu {
  display: grid !important;
}

.social-menu:hover .social-submenu {
  display: grid !important;
}

.desktop-submenu {
  height: auto !important;
  place-content: unset;
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.desktop-menu {
  position: relative;
  padding: 0 !important;
}

.desktop-submenu a {
  margin-top: 10px;
  padding: 0;
  cursor: pointer;
  width: 100%;
}

.desktop-submenu-item div {
  height: auto !important;
  padding: 4px 20px !important;
}
</style>

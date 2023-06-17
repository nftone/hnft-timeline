<template>
  <div id="traits-menu">
    <div
      class="trait-menu-item"
      v-for="(category, i) in categories"
      :key="`category-${category}-${i}`"
    >
      <div class="trait-menu-category">
        <div
          class="trait-menu-category-header"
          @click="onCategoryClicked(category)"
        >
          <div class="triangle-icon">
            <TriangleIcon :is-expanded="expandedCategory === category.title" />
          </div>
          <div class="category-title">{{ category.title }}</div>
        </div>
        <Transition name="slide-fade">
          <div
            v-if="expandedCategory === category.title"
            class="trait-menu-category-body"
          >
            <div
              class="trait"
              v-for="(trait, j) in category.traits"
              :key="`category-${category}-${i}-trait-${trait}-${j}`"
            >
              <input
                type="radio"
                :value="trait"
                :class="`${isDark && 'dark'}`"
                :checked="filters.includes(trait)"
                @click="onCheckboxClicked"
              />
              <span>{{ trait }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDark } from "@vueuse/core";

import TriangleIcon from "@/components/TriangleIcon.vue";
import useGallery from "@/composables/useGallery";

const { categories, filters } = useGallery();
const isDark = useDark();

const expandedCategory = ref(null);

const onCategoryClicked = (category) => {
  if (category.title === expandedCategory.value) expandedCategory.value = null;
  else expandedCategory.value = category.title;
};

const onCheckboxClicked = ({ target: { value } }) => {
  const filterIndex = filters.value.indexOf(value);
  if (filterIndex === -1) filters.value.push(value);
  else filters.value.splice(filterIndex, 1);
};
</script>

<style>
#traits-menu {
  display: grid;
  place-content: center;
  row-gap: 12px;
  font-weight: 400;
  font-size: 12px;
}

.trait-menu-item {
  display: grid;
  place-content: center;
}

.trait-menu-category {
  width: 120px;
  padding-left: 30px;
}

.trait-menu-category-header {
  display: flex;
}

.triangle-icon {
  margin-right: 11px;
  padding-left: 4px;
}

.trait-menu-category-body {
  display: grid;
  place-content: flex-start;
  justify-items: left;
  row-gap: 8px;
  padding-top: 8px;
}

.trait-menu-category-body .trait {
  display: flex;
  align-items: center;
}

.trait-menu-category-body .trait input {
  margin-right: 10px;
}

/* override radio input colors and make everything black */
.trait-menu-category-body .trait input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid black;
  transition: 0.2s all linear;
  position: relative;
  cursor: pointer;
}

.trait-menu-category-body .trait input:checked {
  background-color: white;
}

.trait-menu-category-body .trait input:checked::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.trait-menu-category-body .trait input:active {
  border-color: #000;
}

.trait-menu-category-body .trait input:active::before {
  background-color: #000;
}

.trait-menu-category-body .trait input.dark {
  border: 1px solid white;
}

.trait-menu-category-body .trait input.dark:checked {
  background-color: #000;
}

.trait-menu-category-body .trait input.dark:checked::before {
  background-color: white;
}
</style>

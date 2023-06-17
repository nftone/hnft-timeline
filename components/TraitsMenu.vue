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
                type="checkbox"
                :value="trait"
                :checked="filters.includes(trait)"
                @input="onCheckboxClicked"
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
import TriangleIcon from "@/components/TriangleIcon.vue";
import useGallery from "@/composables/useGallery";

const { categories, filters } = useGallery();
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
  row-gap: 4px;
  padding-top: 8px;
}

.trait-menu-category-body .trait {
  display: flex;
  align-items: center;
}

.trait-menu-category-body .trait input {
  margin-right: 10px;
}
</style>

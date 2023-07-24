<template>
  <Teleport to="body">
    <div v-if="show" class="modal-outer">
      <div ref="modalInner" :class="`modal-inner ${isMobile ? 'mobile' : ''}`">
        <div class="modal-header">
          <div class="close-button">
            <button @click="$emit('close')">X</button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineEmits, ref, computed } from "vue";
import { onKeyStroke, onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close"]);

const modalInner = ref(null);

const show = ref(true)

onKeyStroke("Escape", () => emit("close"));
onClickOutside(modalInner, () => emit("close"));

// @TODO use vueuse useBreakpoints
const isMobile = computed(() => {
  const screen = window.innerWidth;
  if (screen < 768) return true;
  return false;
});
</script>

<style>

.modal-outer {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-background);
  display: grid;
  place-content: center;
}

.modal-inner {
  width: 60vw;
  max-width: 600px;
  height: 80vh;
  background-color: var(--modal-background);
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 1);
  overflow-y: auto;
  display: grid;
  grid-template-rows: 25px auto;
}

.modal-inner.mobile {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  overflow-y: auto;
}

.modal-header {
  width: 100%;
}

.close-button {
  display: flex;
  justify-content: flex-end;
}

.close-button button {
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-color: white;
  font-size: 15px;
  border-radius: 4px;
  border: 2px solid white;
}

.close-button button:hover {
  background-color: black;
  color: white;
}

.modal-body {
  width: 100%;
  text-align: center;
}

</style>

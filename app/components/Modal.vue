<template>
  <div
    v-if="show"
    class="modal-outer"
  >
    <div class="close-button">
      <button @click="$emit('close')">
        X
      </button>
    </div>
    <div
      ref="modalInner"
      :class="{'modal-inner-mobile' : isSmallerThanTablet, 'modal-inner': !isSmallerThanTablet}"
    >
      <div class="modal-header">
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScrollLock, useBreakpoints } from "@vueuse/core"
import { ref, onMounted } from "vue"
import { onKeyStroke, onClickOutside } from "@vueuse/core"

const emit = defineEmits(["close"])

const modalInner = ref(null)

const show = ref(true)

onKeyStroke("Escape", () => emit("close"))
onClickOutside(modalInner, () => emit("close"))

const breakpoints = useBreakpoints({
  tablet: 640,
})

const isSmallerThanTablet = breakpoints.smaller("tablet")

onMounted(() => {
  const el = document.querySelector("body")
  const isLocked = useScrollLock(el)
  isLocked.value = true
})

console.log(isSmallerThanTablet)
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
  max-height: 80vh;
  padding: 1rem;
  background-color: #252525;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 1);
  overflow-y: auto;
  display: grid;
}

.modal-inner-mobile {
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
  background-color: #252525;
}

.modal-inner h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0rem 1rem 0rem;
  background-color: var(--yellow-event);
  border-radius: 4px;
  padding: 0.5rem;
}

.modal-inner-mobile h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0rem 1rem 0rem;
  background-color: var(--yellow-event);
  border-radius: 4px;
  padding: 0.5rem;
}

.modal-inner .subheader {
  background-color: var(--grey);
  border-radius: 4px;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.modal-inner-mobile .subheader {
  background-color: var(--grey);
  border-radius: 4px;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.modal-inner .description {
  margin-bottom: 1rem;
}

.modal-inner-mobile .description {
  margin-bottom: 1rem;
}

.modal-inner .network {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  margin: 2rem 0rem;
}

.modal-inner-mobile .network {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  margin: 1rem 0rem;
}

.modal-inner .network-name {
  font-weight: bold;
}



.modal-inner .network img {
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}

.modal-inner-mobile .network img {
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  border-radius: 50%;
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
  font-weight: bold;
  border: none;
}

.close-button button:hover {
  background-color: #353535;
  color: white;
}

.modal-body {
  width: 100%;
  text-align: center;
}
</style>

<template>
  <Transition name="slide-up-and-down">
    <div v-if="show" class="buy-modal-outer">
      <div class="buy-modal-inner">
        <div class="modal-header">
          <div class="circled-link" @click="$emit('close')">Close</div>
          <div class="circled-link">Connect</div>
        </div>
        <div class="modal-body">
          <div class="logo-section">
            <img
              class="logo-character"
              src="~assets/images/logoCharacter.png"
              alt="Outlawz logo"
            />
          </div>

          <div class="modal-info-table">
            <div class="modal-info-row">
              <div>Remaining</div>
              <div>0000/0000</div>
            </div>
            <div class="modal-info-row">
              <div>Price</div>
              <div>{{ price }} ETH</div>
            </div>
            <div class="modal-quantity-selector-row">
              <div>Items</div>
              <div class="quantity-selector">
                <div class="quantity-selector-button" @click="onMinusClicked">
                  -
                </div>
                <div style="text-align: center">
                  <input type="number" min="1" v-model="quantity" />
                </div>
                <div class="quantity-selector-button" @click="onPlusClicked">
                  +
                </div>
              </div>
              <div>{{ totalPrice }} ETH</div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <div class="circled-link">Confirm</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  show: Boolean,
});

const emits = defineEmits(["close"]);
const quantity = ref(1);
const price = 1.5;

const onMinusClicked = () => {
  if (quantity.value === 1) return;
  quantity.value -= 1;
};

const onPlusClicked = () => {
  if (quantity.value === 20) return;
  quantity.value += 1;
};

const totalPrice = computed(() => {
  return quantity.value * price;
});
</script>

<style>
.buy-modal-outer {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  transition: opacity 0.3s ease;
  place-content: center;
}

.buy-modal-inner {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: var(--background-color);
}

@media (min-width: 640px) {
  .buy-modal-outer {
    display: grid;
  }

  .buy-modal-inner {
    width: 320px;
    height: 570px;
  }
}

.modal-header {
  padding: 24px 0;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 12px;
}

.modal-body {
  display: grid;
  grid-template-rows: 140px auto;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  padding: 0 30px;
}

.modal-info-table {
  display: grid;
  grid-auto-flow: row;
  row-gap: 4px;
  margin-top: 18px;
  grid-template-rows: repeat(3, 38px);
  place-content: stretch;
}

.modal-info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  place-content: center;
}

.modal-info-row div:last-child,
.modal-quantity-selector-row div:last-child {
  text-align: right;
}

.modal-quantity-selector-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.quantity-selector {
  display: grid;
  grid-template-columns: 1fr 38px 1fr;
  place-content: center;
  align-items: center;
}

.quantity-selector-button {
  cursor: pointer;
  font-size: 18px;
  text-align: center !important;
}

.modal-body .logo-section {
  text-align: center;
  align-self: self-end;
}

.logo-section .logo-character {
  width: 106px;
}

.modal-actions {
  padding-bottom: 24px;
}

.quantity-selector input {
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  width: 36px;
  height: 36px;
  text-align: center;
}

.quantity-selector input {
  background-color: transparent;
  color: var(--font-color);
  font-size: 14px;
  text-align: center;
}

.quantity-selector input::-webkit-outer-spin-button,
.quantity-selector input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-selector input:focus {
  outline: none;
}

.slide-up-and-down-enter-from,
.slide-up-and-down-leave-to {
  opacity: 0;
  opacity: 0;
  transition: all 0.3s ease;
}

.slide-up-and-down-enter-from .buy-modal-inner,
.slide-up-and-down-leave-to .buy-modal-inner {
  transform: translateY(100%);
}

.slide-up-and-down-enter-active,
.slide-up-and-down-leave-active {
  transition: opacity 0.3s ease;
}
</style>

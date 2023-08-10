<template>
  <div>
    <h2>Share your thoughts about HNFT Timeline</h2>
    <div v-if="submitted" class="message-success">
      Your message was submitted successfully. <br />
      Thank you!
    </div>
    <div class="contact-input-container">
      <textarea
        id="message"
        v-model="message"
        name="message"
        rows="10"
        placeholder="Enter a message"
      />
      <div v-if="error" class="message-error">
        {{ error }}
      </div>
    </div>
    <div>
      <NuxtTurnstile ref="turnstile" class="captcha" />
    </div>
    <button class="submit-button-contact" @click="onSubmitMessage">
      Submit
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

import { USER_MESSAGE_URL } from "@/constants/appConstants"

const error = ref("")
const message = ref("")
const submitted = ref(false)
const turnstile = ref()

const onSubmitMessage = async () => {
  try {
    if (!message.value) {
      error.value = "Message is required."
      return
    }

    await axios.post(USER_MESSAGE_URL, {
      message: message.value,
    })

    submitted.value = true
    error.value = ""
  } catch (error) {
    error.value = error
  }
}
</script>

<style>
.contact-input-container {
  display: block;
  position: relative;
  width: 100%;
}

.contact-input-container textarea {
  border-radius: 10px;
  width: 100%;
  padding: 12px;
  border: none;
}

.submit-button-contact {
  margin-top: 10px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: 5vh;
}

.submit-button-contact:hover {
  background-color: var(--yellow-event);
  border: 1px solid var(--yellow-event);
  color: black;
}

.message-success {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: limegreen;
  color: black;
  margin-top: 10px;
  border-radius: 4px;
  height: 8vh;
  padding-right: 10px;
  font-size: 0.9rem;
}

.message-error {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 4vh;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.9rem;
}

.captcha {
  margin-top: 10px;
}
</style>

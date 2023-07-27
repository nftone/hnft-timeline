<template>
  <div>
    <div class="contact-header">
      Share your thoughts about HNFT Timeline
    </div>
    <div v-if="submitted" class="message-success">
      Your message was submitted successfully. <br>
      Thank you!
    </div>
    <div class="contact-title">
      <label for="message">
        Message
      </label>
      <textarea
          name="message"
          id="message"
          v-model="message"
          rows="10"
          placeholder=" Enter a message"
          class="textarea"
      ></textarea>
      <div v-if="error" class="message-error">
        {{ error }}
      </div>
    </div>
    <div>
      <NuxtTurnstile class="captcha" />
    </div>
    <button
        class="submit-button-contact"
        @click="onSubmitMessage"
    >
      Submit
    </button>
  </div>
</template>


<script setup>
import {ref} from 'vue';

const error = ref('');
const message = ref('');
const submitted = ref(false);
const reCaptchaToken = ref('');

const onSubmitMessage = () => {
  try {
    if (!message.value) {
      error.value = 'Message is required.';
      return;
    }

    submitted.value = true;
    error.value = '';
  } catch (error) {
    error.value = error;
  }
};
</script>


<style>
.contact-header {
  display: flex;
  align-items: center;
  background-color: var(--yellow-event);
  color: black;
  border-radius: 4px;
  height: 5vh;
  padding-left: 10px;
  padding-right: 10pX;
  font-size: 1rem;
}

.contact-title {
  margin-top: 15px;
  text-align: left;
  font-size: 1rem;
}

.textarea {
  border-radius: 10px;
  width: 100%;
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
  justify-content: center ;
  background-color: limegreen;
  color: black;
  margin-top: 10px;
  border-radius: 4px;
  height: 8vh;
  padding-right: 10pX;
  font-size: 0.9rem;
}

.message-error {
  display: flex;
  align-items: center;
  justify-content: center ;
  background-color: red;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px ;
  border-radius: 4px;
  height: 4vh;
  padding-left: 10px;
  padding-right: 10pX;
  font-size: 0.9rem;
}

.captcha {
  margin-top: 10px;
}
</style>
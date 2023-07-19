<template>
  <div class="header-container">
    <div class="title">
      <h1 class="timeline-title">
        HNFT Timeline
        <!-- TODO: Display version -->
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style>
a {
  text-decoration: none;
}

.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #252525;
}

.title {
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.timeline-title {
  font-size: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.timeline-subtitle {
  font-size: 1rem;
  padding-bottom: 10px;
  font-weight: 500;
}

.timeline-text {
  font-size: 0.8rem;
  padding-bottom: 10px;
  font-weight: 500;
}

.timeline-link {
  transition: 0.2s ease-out;
  text-decoration: underline;
}

@media screen and (max-width: 767px) {
  .header-container {
    order: 5;
    justify-content: start;
  }
}
</style>

<template>
  <section id="team">
    <h1 v-if="!largerThanSm">The team</h1>

    <div class="team-members">
      <div class="team-member">
        <img src="@/assets/images/lugosis.png" alt="Lugosis" />
        <div class="team-member-name">Lugosis</div>
        <div class="team-member-position">Artist</div>
      </div>

      <div class="team-member">
        <img src="@/assets/images/dan.png" alt="Dan" />
        <div class="team-member-name">Dan</div>
        <div class="team-member-position">Art curator</div>
      </div>

      <div class="team-member">
        <img src="@/assets/images/victor.png" alt="Victor" />
        <div class="team-member-name">Victor</div>
        <div class="team-member-position">Project lead</div>
      </div>

      <div class="team-member">
        <img src="@/assets/images/krillin.png" alt="Krillin" />
        <div class="team-member-name">Krillin</div>
        <div class="team-member-position">Incubator</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanSm = breakpoints.greater("sm");
</script>

<style>
#team {
  margin-top: 150px;
  position: relative;
  margin-bottom: 50px;
}

.team-members {
  display: grid;
  width: 100%;
  grid-auto-flow: row;
  place-content: center;
  text-align: center;
  row-gap: 60px;
}

.team-member {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
}

.team-member img {
  width: 106px;
}

.team-member-name {
  margin-top: 12px;
}

.team-member-position {
  font-style: italic;
}

@media (min-width: 640px) {
  #team {
    margin-top: 0;
    height: 100vh;
    display: grid;
    place-items: center;
    margin-bottom: 0;
  }

  .team-members {
    width: 100%;
    align-items: self-end;
    grid-template-columns: repeat(2, 1fr);
    inline-size: auto;
    row-gap: 80px;
    column-gap: 80px;
  }

  .team-member {
    font-size: 16px;
    font-weight: 500;
  }

  .team-member img {
    width: 200px;
  }

  .team-member-name {
    font-weight: 800;
  }

  .team-member-position {
    font-style: normal;
  }
}

@media (min-width: 1200px) {
  .team-members {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1400px;
    width: 100%;
    align-items: self-end;
  }

  .team-member img {
    width: 253px;
  }
}
</style>

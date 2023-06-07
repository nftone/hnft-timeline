<template>
  <section id="team">
    <h1>The team</h1>

    <div class="team-members">
      <div class="team-member">
        <img src="@/assets/images/lugosis.png" alt="Lugosis" />
        <div class="team-member-name">Lugosis</div>
        <div class="team-member-position"><i>Artist</i></div>
      </div>

      <div class="team-member">
        <img src="@/assets/images/dan.png" alt="Dan" />
        <div class="team-member-name">Dan</div>
        <div class="team-member-position"><i>Art curator</i></div>
      </div>

      <div class="team-member">
        <img src="@/assets/images/victor.png" alt="Victor" />
        <div class="team-member-name">Victor</div>
        <div class="team-member-position"><i>Project lead</i></div>
      </div>

      <div class="team-member">
        <img src="@/assets/images/krillin.png" alt="Krillin" />
        <div class="team-member-name">Krillin</div>
        <div class="team-member-position"><i>Incubator</i></div>
      </div>
    </div>
  </section>
</template>

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
  height: 112px;
}

.team-member-name {
  margin-top: 12px;
}
</style>

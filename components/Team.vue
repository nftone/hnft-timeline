<template>
  <div id="team">
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
</template>

<style>
#team {
  margin-top: 130px;
  position: relative;
  display: grid;
  width: 100%;
  grid-auto-flow: row;
  place-content: center;
  text-align: center;
  row-gap: 60px;
  margin-bottom: 50px;
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

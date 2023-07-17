<template>
  <Teleport to="body">
    <div v-if="!loading" :class=" isMobile ? 'full-screen-modal' : 'screen-modal'">
      <div class="detail-project">
        <div>
          {{project.date}}
        </div>
        <div>
          <h2>{{project.name}}</h2>
        </div>
        <div>
          description : TODO {{project.description}}
        </div>
        <div>
          <img class="image-size" :src="`images/projects/${project.image}`" alt="image of project">
        </div>
        <div>
          creator : TODO {{project.creator}}
        </div>
        <div>
          {{project.network}}
        </div>
        <div>
          <table>
            <tbody>
              <div v-for="link in project.links">
                <tr>
                  <td> <a :href="link.url">{{ link.name }} </a> </td>
                </tr>
              </div>
            </tbody>
          </table>
        </div>
        <!-- <div>
          <br>
          <div class="display-link">
            <a :href="project.links[0].url" class="link"> {{project.links[0].name}} </a>
            <a :href="project.links[1].url"> {{project.links[1].name}} </a>
          </div>
          <div class="display-link">
            <a :href="project.links[2].url" class="link"> {{project.links[2].name}} </a>
            <a :href="project.links[3].url"> {{project.links[3].name}} </a>
          </div>
          <div class="display-link">
            <a :href="project.links[5].url" class="link"> {{project.links[5].name}} </a>
            <a :href="project.links[6].url"> {{project.links[6].name}} </a>
          </div>
          <div class="display-link">
            <a :href="project.links[7].url" class="link"> {{project.links[7].name}} </a>
            <a :href="project.links[8].url"> {{project.links[8].name}} </a>
          </div>
        </div>-->
        <button @click="$emit('close')">CLOSE</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, defineProps, ref, computed } from "vue";
import useTimelineData from "../composables/useTimelineData";

const props = defineProps(["slug"]);
const loading = ref(true);
const project = ref(null);

const isMobile = computed(() => {
  const screen = window.innerWidth
  let screenWidth
  if (screen < 768) {
    screenWidth = true
  } else {
    screenWidth = false
  }
  return screenWidth
})

onMounted(async () => {
  const { getProjectBySlug, initialize } = useTimelineData();
  await initialize();
  project.value = getProjectBySlug(props.slug);
  loading.value = false;
});
</script>

<style>
.full-screen-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.5;
  overflow-y: auto;
}

.screen-modal  {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 40%;
  height: 80%;
  transform: translate(75%, 5%);
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.5;
  overflow-y: auto;
}

.detail-project {
  text-align: center;
  font-family: Lato, Helvetica, Arial, sans-serif;
  margin-top: 480px;
}

.image-size {
  width: 250px;
  height: 250px;
}

.link {
  margin-right: 40px;
}
</style>

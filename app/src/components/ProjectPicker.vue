<template>
  <div class="h:75vh h:72.8vh@<md direction:rtl ac:flex-end">
    <div class="row ai:center gap:4 mb:40">
      Project Three.js
      <div class="b:1|solid|$(grayscale-400) p:4 bg:$(grayscale-1000)"></div>
    </div>
    <div
      v-for="project in projects"
      :key="project"
      class="hover2 cursor:pointer row ai:end gap:8 mb:12 w:min"
      @click="goto(project.title)"
    >
      <span class="f:60 my-font lh:1 flex-basis:full@<md">{{
        project.title
      }}</span>
      <span class="f:bold white-space:nowrap">{{ project.date }}</span>
    </div>
  </div>
  <ProjectDialog
    v-if="showProjectDialog"
    v-model:dialogShow="showProjectDialog"
    :project="projectName"
  />
</template>

<script setup>
import { ref } from "vue";
import ProjectDialog from "src/components/ProjectDialog.vue";

const showProjectDialog = ref(false);
const projectName = ref("");
const projects = ref([
  {
    title: "Card",
    date: "Mar. 2024 / Toast Club / Three Fiber",
  },
  {
    title: "Card-Init",
    date: "Mar. 2024 / Toast Club / Three Fiber",
  },
  {
    title: "DrawBox",
    date: "Feb. 2024 / Toast Club / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
]);

const goto = (val) => {
  projectName.value = val;
  showProjectDialog.value = true;
};
</script>

<style></style>

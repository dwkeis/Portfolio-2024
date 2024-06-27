<template>
  <div class="no-scroll max-w:230@<md h:100vh mb:-30 direction:rtl ac:flex-end">
    <div class="my:106"><br /></div>

    <div class="row ai:center gap:4">
      Project Three.js
      <div class="b:1|solid|$(grayscale-400) p:4 bg:$(grayscale-1000)"></div>
    </div>
    <div class="f:12">The entire project was originally built using R3F*</div>
    <div class="f:12 mb:40">
      It is now being reconstructed using Three.js for demonstration purposes
    </div>

    <div
      v-for="project in projects"
      :key="project"
      class="hover2 cursor:pointer row ai:end gap:8 mb:12 w:fit"
      @click="goto(project.title)"
    >
      <span class="f:60 my-font lh:1 flex-basis:full@<md">{{
        project.title
      }}</span>
      <span class="f:bold white-space:nowrap">{{ project.date }}</span>
    </div>
    <div class="row ai:center gap:4 my:40">
      Project Vue3
      <div class="b:1|solid|$(grayscale-400) p:4 bg:$(grayscale-1000)"></div>
    </div>
    <div
      v-for="project in vueProjects"
      :key="project"
      class="hover2 cursor:pointer row ai:end gap:8 mb:12 mb:30:last-child w:fit"
      @click="open(project.title)"
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
    date: "Mar. 2024 / Taost Club / Three",
  },
  {
    title: "Card-Init",
    date: "Mar. 2024 / Taost Club / Three",
  },
  {
    title: "DrawBox",
    date: "Feb. 2024 / Taost Club / Three",
  },
  {
    title: "Sphere",
    date: "May. 2024 / Taost Annecy / Three",
  },
  // {
  //   title: "Floating Card",
  //   date: "Apr. 2024 / Taost Annecy / Three",
  // },
]);
const vueProjects = ref([
  {
    title: "OpenTalk",
    date: "Mar. 2022 / Quasar2 + Master Css",
  },
  {
    title: "Caigunn",
    date: "Nov. 2023 / Nuxt + Master Css",
  },
  {
    title: "APMIC",
    date: "Sept. 2023 / Nuxt + Tailwind Css",
  },
]);

const goto = (val) => {
  projectName.value = val;
  showProjectDialog.value = true;
};
const open = (val) => {
  if (val === "OpenTalk") {
    window.open("https://opentalk.ap-mic.com/login", "_blank");
  } else if (val === "Caigunn") {
    window.open("https://caigunn.ap-mic.com/", "_blank");
  } else {
    window.open("https://www.ap-mic.com/", "_blank");
  }
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scroll::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge, and Firefox */
.no-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.no-scroll {
  overflow: auto !important; /* Important for enabling scroll */
}
</style>

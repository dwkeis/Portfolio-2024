<template>
  <div class="no-scroll h:75vh h:72.8vh@<md direction:rtl">
    <div class="row ai:center gap:4 mb:40">
      Project Three.js
      <div class="b:1|solid|$(grayscale-400) p:4 bg:$(grayscale-1000)"></div>
    </div>
    <div
      v-for="project in projects"
      :key="project"
      class="hover2 cursor:pointer row ai:end gap:8 mb:12 w:fit"
    >
      <span class="f:60 my-font lh:1 flex-basis:full@<md">{{
        project.title
      }}</span>
      <span class="f:bold">{{ project.date }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
  },
  {
    title: "Card",
    date: "Feb. 2024 / Three Fiber",
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

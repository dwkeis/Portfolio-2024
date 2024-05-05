<template>
  <q-page class="column full-height">
    <canvas class="webgl"></canvas>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { initThree } from "src/components/bg";

defineOptions({
  name: "ThreePage",
});

onMounted(() => {
  let canvas_element = document.querySelector("canvas.webgl");
  initThree(canvas_element);
});
</script>

<template>
  <div
    class="fixed display:flex flex:row flex:nowrap gap:16 left:24 bottom:32 transform-origin:left transform-origin:bottom rotate(-90)"
  >
    <div class="row ai:center gap:4 cursor:pointer" @click="pickLight(true)">
      <div
        class="b:1|solid|$(grayscale-400) p:4"
        :class="`${isLightTheme ? 'bg:$(grayscale-1000) ' : ''}`"
      ></div>
      Light
    </div>
    <div class="row ai:center gap:4 cursor:pointer" @click="pickLight(false)">
      <div
        class="b:1|solid|$(grayscale-400) p:4"
        :class="`${isLightTheme ? '' : 'bg:white '}`"
      ></div>
      Dark
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from "src/stores/theme";
import { computed } from "vue";

const myTheme = useThemeStore();

const isLightTheme = computed(() => {
  return myTheme.getLightTheme;
});

const pickLight = (val) => {
  myTheme.setLightTheme(val);
};
</script>

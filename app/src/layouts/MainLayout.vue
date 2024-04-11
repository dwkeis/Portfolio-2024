<template>
  <q-layout>
    <q-page-container
      :class="`${
        isLightTheme
          ? 'bg:$(grayscale-10) color:#101010 transition:500ms'
          : 'bg:#101010 color:$(grayscale-10) transition:500ms'
      }`"
    >
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: "MainLayout",
});

import { useThemeStore } from "src/stores/theme";
import { computed } from "vue";

const myTheme = useThemeStore();

const isLightTheme = computed(() => {
  return myTheme.getLightTheme;
});
</script>

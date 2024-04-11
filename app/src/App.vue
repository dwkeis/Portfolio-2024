<template>
  <router-view />
</template>

<script setup>
import "@master/css";
import "src/master.css.js";

defineOptions({
  name: "App",
});
</script>

<style>
:root {
  --grayscale-1000: #333333;
  --grayscale-400: #adadad;
  --grayscale-200: #d6d6d6;
  --grayscale-50: #f5f5f5;
  --grayscale-10: #fafafa;
  --grayscale-0: #ffffff;
}

@font-face {
  font-family: customfont;
  src: url(/NeueMontreal-Light.otf);
}
.my-font {
  font-family: "customfont";
}
</style>

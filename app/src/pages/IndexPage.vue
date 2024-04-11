<template>
  <q-page class="column full-height overflow:hidden!">
    <transition name="fade">
      <div
        v-if="preLoad"
        class="row ai:center jc:center h:100vh w:100vw bg:#181818"
      >
        <img src="sign_brush.gif" />
        <div class="fixed top:50% f:32 translate(0,-50%) teko-sign color:white">
          KEIS MA
        </div>
      </div>
      <div
        v-else
        class="h:90vh d:flex flex:col flex-grow:1 m:32 b:1|solid|$(grayscale-400)"
      >
        <theme-picker />
        <div class="h:100% m:32 overflow:auto">
          <div id="title" class="h:150">
            <div id="home" class="d:flex ai:center">
              <img
                id="banner"
                src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY1MDE2ODQ1NQ&ixlib=rb-1.2.1&q=85"
                alt=""
                class="w:300 h:150 translateX(-60) opacity:0 transition:all|300ms|linear|50ms"
              />
              <div
                id="banner_text"
                class="z:999 translateX(90) opacity:0 transition:all|300ms|linear|50ms"
              >
                <div class="ml:-60 lora-banner f:48">ma keng chon</div>
                <div class="ml:160 open-sans">FRONTEND DEVELOPER</div>
              </div>
            </div>
            <div id="kc_title" class="my-font h:150 d:none opacity:0">
              <div class="f:60 font-weight:200">Keis Ma</div>
              <div class="f:13 font-weight:400">Developer & Footballer(?)</div>
            </div>
          </div>

          <div class="mt:56">
            <ContentPicker @update="(val) => isHome(val)" />
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import ThemePicker from "src/components/ThemePicker.vue";
import ContentPicker from "src/components/ContentPicker.vue";
import { onMounted } from "vue";
import { ref } from "vue";

defineOptions({
  name: "IndexPage",
});

const preLoad = ref(true);
const currentPage = ref("Home");

const isHome = (val) => {
  let previous = currentPage.value;

  if (previous === "Home") {
    let title_element = document.getElementById("banner");
    title_element.className =
      "w:300 h:150 translateX(-60) opacity:0 transition:all|300ms|linear|50ms";
    let text_element = document.getElementById("banner_text");
    text_element.className =
      "z:999 translateX(90) opacity:0 transition:all|300ms|linear|50ms";

    setTimeout(() => {
      let home_element = document.getElementById("home");
      home_element.className = "d:none ai:center";
    }, 300);
    setTimeout(() => {
      let kc_element = document.getElementById("kc_title");
      kc_element.className = "my-font h:150 d:block opacity:0";
    }, 500);
    setTimeout(() => {
      let kc_element = document.getElementById("kc_title");
      kc_element.className =
        "my-font h:150 d:block opacity:1 transition:all|300ms";
    }, 550);
  } else if (val === "Home") {
    let kc_element = document.getElementById("kc_title");
    kc_element.className =
      "my-font h:150 d:block opacity:0 transition:all|300ms";
    setTimeout(() => {
      let kc_element = document.getElementById("kc_title");
      kc_element.className =
        "my-font h:150 d:none opacity:0 transition:all|300ms";
    }, 500);
    setTimeout(() => {
      let home_element = document.getElementById("home");
      home_element.className = "d:flex ai:center";
    }, 500);
    setTimeout(() => {
      let element = document.getElementById("banner");
      element.className =
        "w:300 h:150 translateX(0) opacity:1 transition:all|300ms|linear|50ms";
      let text_element = document.getElementById("banner_text");
      text_element.className =
        "z:999 translateX(0) opacity:1 transition:all|300ms|linear|50ms";
    }, 550);
  }
  currentPage.value = val;
};

onMounted(() => {
  setTimeout(() => {
    preLoad.value = false;
    setTimeout(() => {
      let element = document.getElementById("banner");
      element.className =
        "w:300 h:150 translateX(0) opacity:1 transition:all|300ms|linear|50ms";
      let text_element = document.getElementById("banner_text");
      text_element.className =
        "z:999 translateX(0) opacity:1 transition:all|300ms|linear|50ms";
    }, 500);
  }, 3000);
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

.teko-sign {
  font-family: "Teko", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.lora-banner {
  font-family: "Lora", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.open-sans {
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

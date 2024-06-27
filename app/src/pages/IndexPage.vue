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
        class="h:90vh d:flex flex:col flex-grow:1 m:32 m:24@<md b:1|solid|$(grayscale-400)"
      >
        <theme-picker />
        <canvas
          id="webgl"
          class="webgl fixed z:99 h:calc(100%-32px) w:calc(100%-32px)"
        ></canvas>
        <div
          id="three"
          class="fixed z:99 h:calc(100%-32px) w:calc(100%-32px)"
        ></div>
        <div class="h:100% m:32 m:16@<md overflow:auto">
          <div id="title" class="h:150">
            <div class="ai:center" :class="homeClass">
              <img
                src="banner.jpg"
                alt=""
                class="w:300 h:168.75 {w:150;h:84;}@<md transition:all|300ms|linear|50ms"
                :class="bannerClass"
              />
              <div
                class="t:nowrap transition:all|300ms|linear|50ms z:999"
                :class="bannerTextClass"
              >
                <div class="ml:-60 lora-banner f:48 f:32@<md mt:12@<md">
                  ma keng chon
                </div>
                <div class="ml:160 ml:30@<md open-sans">FRONTEND DEVELOPER</div>
              </div>
            </div>
            <div
              class="my-font h:150 d:block transition:all|300ms"
              :class="subTextClass"
            >
              <div class="f:60 font-weight:200">Keis Ma</div>
              <div class="f:13 font-weight:400">Developer & Footballer</div>
            </div>
          </div>

          <div class="mt:56 mt:32@<md">
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
import * as THREE from "three";
import { AsciiEffect } from "src/components/AsciiEffect.js";

defineOptions({
  name: "IndexPage",
});

const canvas = ref(null);
const renderer = ref(null);
const effect = ref(null);
const preLoad = ref(true);
const currentPage = ref("Home");
const homeClass = ref("d:flex");
const bannerClass = ref("translateX(-60) opacity:0");
const bannerTextClass = ref("translateX(90) opacity:0");
const subTextClass = ref("opacity:0");

const isHome = (val) => {
  let previous = currentPage.value;

  if (previous === "Home") {
    bannerClass.value = "translateX(-60) opacity:0";
    bannerTextClass.value = "translateX(90) opacity:0";

    setTimeout(() => {
      homeClass.value = "d:none";
    }, 300);
    setTimeout(() => {
      subTextClass.value = "opacity:0";
    }, 500);
    setTimeout(() => {
      subTextClass.value = "opacity:1";
    }, 550);
  } else if (val === "Home") {
    subTextClass.value = "opacity:0";
    setTimeout(() => {
      subTextClass.value = "d:none!";
    }, 500);
    setTimeout(() => {
      homeClass.value = "d:flex";
    }, 500);
    setTimeout(() => {
      bannerClass.value = "translateX(0) opacity:1";
      bannerTextClass.value = "translateX(0) opacity:1";
    }, 550);
  }
  currentPage.value = val;
};

const initThree = () => {
  // canvas.value = document.getElementById("webgl");
  // const camera = new THREE.PerspectiveCamera(
  //   70,
  //   window.innerWidth / window.innerHeight,
  //   1,
  //   1000
  // );
  // camera.position.y = 150;
  // camera.position.z = 500;
  // const scene = new THREE.Scene();
  // scene.background = "red";
  // const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
  // pointLight1.position.set(500, 500, 500);
  // scene.add(pointLight1);
  // const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
  // pointLight2.position.set(-500, -500, -500);
  // scene.add(pointLight2);
  // const sphere = new THREE.Mesh(
  //   new THREE.SphereGeometry(200, 20, 10),
  //   new THREE.MeshPhongMaterial({ flatShading: true })
  // );
  // scene.add(sphere);
  // // Plane
  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry(400, 400),
  //   new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
  // );
  // plane.position.y = -200;
  // plane.rotation.x = -Math.PI / 2;
  // scene.add(plane);
  // renderer.value = new THREE.WebGLRenderer({
  //   canvas: canvas.value,
  // });
  // renderer.value.setSize(window.innerWidth, window.innerHeight);
  // renderer.value.render(scene, camera);
};

onMounted(() => {
  setTimeout(() => {
    preLoad.value = false;
    setTimeout(() => {
      bannerClass.value = "translateX(0) opacity:1";
      bannerTextClass.value = "translateX(0) opacity:1";
      initThree();
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
  font-variation-settings: "width" 100;
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

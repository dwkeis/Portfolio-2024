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
        <div
          id="project_area"
          class="abs z:99 w:calc(100vw-24px*2-2px)@<md h:calc(100vh-24px*2-2px)@<md w:calc(100vw-32px*2-2px) h:calc(100vh-32px*2-2px)"
        >
          <canvas id="webgl" class="webgl w:full! h:full!"></canvas>
        </div>
        <div class="h:100% m:32 m:16@<md overflow:auto">
          <div id="title" class="h:150">
            <div class="ai:center" :class="homeClass">
              <img
                src="banner.jpg"
                alt=""
                class="w:300 h:168.75 {w:150;h:84;}@<md transition:all|300ms|linear|50ms z:999"
                :class="bannerClass"
              />
              <div
                class="t:nowrap transition:all|300ms|linear|50ms z:999 blend:difference color:white"
                :class="bannerTextClass"
              >
                <div class="ml:-60 lora-banner f:48 f:32@<md mt:12@<md">
                  ma keng chon
                </div>
                <div class="ml:160 ml:30@<md open-sans">FRONTEND DEVELOPER</div>
              </div>
            </div>
            <div
              class="my-font h:150 d:block transition:all|300ms blend:difference color:white"
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
import { onMounted, onUnmounted } from "vue";
import { ref } from "vue";
import * as THREE from "three";
import { AsciiEffect } from "src/components/AsciiEffect.js";

defineOptions({
  name: "IndexPage",
});

const preLoad = ref(true);
const currentPage = ref("Home");
const homeClass = ref("d:flex");
const bannerClass = ref("translateX(-60) opacity:0");
const bannerTextClass = ref("translateX(90) opacity:0");
const subTextClass = ref("opacity:0");

// three
const sizes = { width: 0, height: 0 };
const scene = new THREE.Scene();
const canvas = ref(null);
const renderer = ref(null);
const effect = ref(null);
const camera = ref(null);
const clock = new THREE.Clock();

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

const initThree = async () => {
  canvas.value = document.getElementById("webgl");
  sizes.width = canvas.value.offsetWidth - 2;
  sizes.height = canvas.value.offsetHeight - 2;
  camera.value = new THREE.PerspectiveCamera(
    50,
    sizes.width / sizes.height,
    1,
    1000
  );
  camera.value.position.set(10, 10, 20);
  scene.add(camera.value);

  const pointLight1 = new THREE.PointLight(0xffffff, 1, 20, 0);
  pointLight1.position.set(15, 15, 15);
  scene.add(pointLight1);
  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(pointLight1, sphereSize);
  scene.add(pointLightHelper);

  const pointLight2 = new THREE.PointLight(0xffffff, 1, 15, 0);
  pointLight2.position.set(-15, -15, 15);
  scene.add(pointLight2);
  const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
  scene.add(pointLightHelper2);
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(20, 320, 160),
    new THREE.MeshPhongMaterial({
      color: new THREE.Color("white"), // Set color to black
      transparent: true,
      opacity: 1, // Make it fully transparent
      side: THREE.DoubleSide,
      shadowSide: THREE.BackSide,
    })
  );
  sphere.castShadow = false; // Enable shadow casting
  sphere.receiveShadow = true;
  scene.add(sphere);

  // setRender

  renderer.value = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
  });
  // renderer.value.setClearColor(0x000000, 0);
  renderer.value.shadowMap.enabled = true;
  renderer.value.setSize(sizes.width - 18, sizes.height - 18);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const animateLights = () => {
    const time = Date.now() * 0.0007; // Current time in seconds

    // Animate first light
    pointLight1.position.x = Math.sin(time * 0.7) * 30;
    pointLight1.position.y = Math.cos(time * 0.5) * 30;
    pointLight1.position.z = (Math.cos(time * 0.8) / 2) * 30;

    pointLight2.position.x = Math.cos(time * 0.7) * 30;
    pointLight2.position.y = Math.sin(time * 0.5) * 30;
    pointLight2.position.z = (Math.sin(time * 0.8) / 2) * 30;

    // Render the scene
    renderer.value.render(scene, camera.value);

    // Call animateLights again on the next frame
    requestAnimationFrame(animateLights);
  };
  animateLights();
};

const onResize = () => {
  canvas.value = document.getElementById("project_area");

  sizes.width = canvas.value.offsetWidth;
  sizes.height = canvas.value.offsetHeight;

  camera.value.aspect = sizes.width / sizes.height;
  camera.value.updateProjectionMatrix();

  renderer.value.setSize(sizes.width, sizes.height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

onMounted(() => {
  setTimeout(() => {
    preLoad.value = false;
    setTimeout(() => {
      window.addEventListener("resize", onResize);
      bannerClass.value = "translateX(0) opacity:1";
      bannerTextClass.value = "translateX(0) opacity:1";
      // initThree();
    }, 500);
  }, 3000);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
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

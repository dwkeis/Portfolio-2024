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
        id="index_frame"
        class="h:90vh d:flex flex:col flex-grow:1 m:32 m:24@<md b:1|solid|$(grayscale-400)"
      >
        <theme-picker />
        <div
          id="test_project"
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
import { computed, onMounted, onUnmounted, shallowRef, watch } from "vue";
import { ref } from "vue";
import { useThemeStore } from "src/stores/theme";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";
import { DotScreenShader } from "three/addons/shaders/DotScreenShader.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

defineOptions({
  name: "IndexPage",
});

const myTheme = useThemeStore();
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

// Use shallowRef for Three.js objects
const scene = shallowRef(new THREE.Scene());
const camera = shallowRef(null);
const renderer = shallowRef(null);
const composer = shallowRef(null);
const pointLight1 = shallowRef(null);
const pointLight2 = shallowRef(null);
const currentColor = shallowRef(new THREE.Color(0xffffff));
const backgroundColor = computed(() => {
  return myTheme.getLightTheme ? 0xffffff : 0x000000;
});
let animationFrameId = null;

function createLight(color) {
  const intensity = 1500;

  const light = new THREE.PointLight(color, intensity, 200);
  light.castShadow = true;

  // light bulb for debug usage
  // let geometry = new THREE.SphereGeometry(0.3, 12, 6);
  // let material = new THREE.MeshBasicMaterial({ color: color });
  // material.color.multiplyScalar(intensity);
  // let sphere = new THREE.Mesh(geometry, material);
  // light.add(sphere);

  // outside sphere
  const texture = new THREE.CanvasTexture(generateTexture());
  texture.magFilter = THREE.NearestFilter;
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(1, 4.5);

  let geometry = new THREE.SphereGeometry(2, 32, 8);
  let material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    alphaMap: texture,
    alphaTest: 0.5,
    opacity: 0,
  });

  let sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.receiveShadow = false;
  light.add(sphere);

  return light;
}

function generateTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;

  const context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 1, 2, 1);

  return canvas;
}

const initThree = () => {
  const canvas = document.getElementById("webgl");
  const size = document.getElementById("index_frame");
  const width = size.offsetWidth;
  const height = size.offsetHeight - 2;

  camera.value = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
  camera.value.position.set(10, 5, 25);

  scene.value.fog = new THREE.Fog(0x000000, 1, 1000);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  scene.value.add(hemisphereLight);

  pointLight1.value = createLight(0x0088ff);
  scene.value.add(pointLight1.value);

  pointLight2.value = new THREE.PointLight(0x0040ff, 1, 20, 0);
  pointLight2.value.power = 100;
  scene.value.add(pointLight2.value);

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(20, 320, 160),
    new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      shininess: 10,
    })
  );
  sphere.castShadow = false;
  sphere.receiveShadow = true;
  scene.value.add(sphere);

  renderer.value = new THREE.WebGLRenderer({ canvas });
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.value.setSize(width, height);
  renderer.value.shadowMap.enabled = true;
  renderer.value.shadowMap.type = THREE.BasicShadowMap;
  renderer.value.setClearColor(backgroundColor.value, 1);

  composer.value = new EffectComposer(renderer.value);
  composer.value.addPass(new RenderPass(scene.value, camera.value));

  const effect1 = new ShaderPass(DotScreenShader);
  effect1.uniforms["scale"].value = 4;
  composer.value.addPass(effect1);

  const effect2 = new ShaderPass(RGBShiftShader);
  effect2.uniforms["amount"].value = 0.0015;
  composer.value.addPass(effect2);

  const effect3 = new OutputPass();
  composer.value.addPass(effect3);

  animate();
};

const animate = () => {
  const time = Date.now() * 0.0007; // Current time in seconds
  pointLight1.value.position.y = Math.cos(time * 0.5) * 20;
  pointLight1.value.rotation.x = time;
  pointLight1.value.rotation.y = time;

  pointLight2.value.position.x = Math.cos(time * 0.7) * 30;
  pointLight2.value.position.y = Math.sin(time * 0.5) * 30;
  pointLight2.value.position.z = (Math.sin(time * 0.8) / 2) * 30;
  if (composer.value && scene.value && camera.value) {
    scene.value.updateMatrixWorld();
    composer.value.render();
  }
  animationFrameId = requestAnimationFrame(animate);
};

const onResize = () => {
  if (!camera.value || !renderer.value) return;

  const canvas = document.getElementById("index_frame");
  const width = Math.max(1, Math.floor(canvas.offsetWidth));
  const height = Math.max(1, Math.floor(canvas.offsetHeight - 2));

  camera.value.aspect = width / height;
  camera.value.updateProjectionMatrix();

  renderer.value.setSize(width, height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (composer.value) {
    composer.value.setSize(width, height);
  }
};

const transitionBackgroundColor = (targetColor) => {
  if (scene.value) {
    gsap.to(currentColor.value, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 1, // Duration of the transition in seconds
      onUpdate: () => {
        scene.value.background = currentColor.value;
        scene.value.fog.color.copy(currentColor.value);
      },
    });
  }
};

watch(backgroundColor, (newColor) => {
  if (renderer.value) {
    const targetColor = new THREE.Color(newColor);
    transitionBackgroundColor(targetColor);
  }
});

onMounted(() => {
  setTimeout(() => {
    preLoad.value = false;
    setTimeout(() => {
      window.addEventListener("resize", onResize);
      bannerClass.value = "translateX(0) opacity:1";
      bannerTextClass.value = "translateX(0) opacity:1";
      initThree();
    }, 500);
  }, 3000);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
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

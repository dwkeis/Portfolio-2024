<template>
  <base-dialog
    v-model:dialogShow="myShow"
    :width="`${isMobile ? '90vw' : '70vw'}`"
    :height="`${isMobile ? '50vh' : '80vh'}`"
    body-class="h:90%"
  >
    <template #header>
      <div class="f:bold f:24 my-font">{{ project }}</div>
    </template>
    <template #body>
      <div id="project_dialog" class="h:full">
        <canvas class="project overflow:hidden!"></canvas>
      </div>
    </template>
  </base-dialog>
</template>

<script setup>
import BaseDialog from "src/components/BaseDialog.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { gsap } from "gsap";
import { easing } from "maath";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const props = defineProps({
  dialogShow: {
    type: Boolean,
    default: false,
  },
  project: {
    type: String,
  },
});
const emit = defineEmits(["update:dialogShow"]);

const myShow = computed({
  get: () => props.dialogShow,
  set: (value) => emit("update:dialogShow", value),
});

const sizes = { width: 0, height: 0 };
const lastMousePosition = { x: 0, y: 0 };
const tracking = ref(null);

const scene = new THREE.Scene();
scene.background = null;
const canvas = ref(null);
const renderer = ref(null);
const camera = ref(null);
const clock = new THREE.Clock();

const isMobile = computed(() => {
  return window.innerWidth < 1024;
});

const rgbeLoader = new RGBELoader();
rgbeLoader.load("HDR_029_Sky_Cloudy_Env.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environmentMap;
});
const gltfLoader = new GLTFLoader();
const controls = ref(null);

const initCard = () => {
  /**
   * Models
   */
  const mixer = ref(null);
  const medal = ref(null);

  gltfLoader.load("GLB_CARD_004.glb", (gltf) => {
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);
    if (gltf.animations.length > 0) {
      mixer.value = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.value.clipAction(gltf.animations[0]);
      action.play();
    }

    /** Lights on left side */
    const spotLightLeft = new THREE.DirectionalLight("#F6F2EC", 3);
    spotLightLeft.position.set(-0.5, -0.5, 0.9);
    spotLightLeft.intensity = 1;
    scene.add(spotLightLeft);
    spotLightLeft.target.position.set(0, 0.8, -0.2);
    scene.add(spotLightLeft.target);

    /** Picture */
    gltf.scene.traverse((child) => {
      if (child.name === "photo") {
        child.material.ior = 1.0;
        child.material.reflectivity = 0;
        child.material.roughness = 1;
      }
      if (child.name === "card001") {
        child.material.ior = 1.0;
        child.material.reflectivity = 0;
        child.material.roughness = 1;
      }
    });
    gltf.scene.rotation.set(0, 2.5, 0);
    gltf.scene.position.set(0.7, -0.07, 0);
    medal.value = gltf.scene;
    scene.add(gltf.scene);
    gsap.to(medal.value.rotation, {
      duration: 1.5,
      x: 0,
      y: 0,
    });
    gsap.to(medal.value.position, {
      duration: 1.5,
      x: 0,
      onComplete: () => {
        intro = false;
      },
    });
  });

  /**
   * Camera
   */
  camera.value.position.set(0, -0.1, 1);
  scene.add(camera.value);

  /**
   * Animate
   */

  let intro = true;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Call tick again on the next frame
    requestAnimationFrame(tick);
    if (mixer.value) {
      if (!intro) {
        const dampingFactor = 0.25;
        const targetRotation = [
          lastMousePosition.x / 5,
          lastMousePosition.y / 5,
          0,
        ];

        easing.dampE(
          medal.value.rotation,
          targetRotation,
          dampingFactor,
          elapsedTime
        );
        medal.value.rotation.y += Math.cos(elapsedTime) * 0.08;
        medal.value.rotation.x += Math.sin(elapsedTime) * 0.08;
      }
      // Render
      renderer.value.render(scene, camera.value);
    }
  };

  const coinAnimation = () => {
    const delta = clock.getDelta();
    if (mixer.value) {
      mixer.value.update(delta * 12);
    }
    renderer.value.render(scene, camera.value);
    requestAnimationFrame(coinAnimation);
  };

  setRender();
  tick();
  coinAnimation();
};

const initCoinCard = () => {
  /**
   * Models
   */
  const coin_bottom_left = ref(null); // icon
  const coin_bottom_right = ref(null); // icon2
  const coin_top = ref(null); // icon1
  const coin_left = ref(null); // icon3
  const coin_right = ref(null); // icon1
  const mixer_coin = ref(null);

  const card = ref(null);
  const card_only = ref(null);
  const photo_only = ref(null);
  const ani_coin = ref(null);
  let card_y, photo_y, ani_coin_y;
  let card_rotation_y, photo_rotation_y, ani_coin_rotation_y;

  gltfLoader.load("GLB_CARD_icon_all_v2.glb", (gltf) => {
    if (gltf.animations.length > 0) {
      mixer_coin.value = new THREE.AnimationMixer(gltf.scene);
      const action = mixer_coin.value.clipAction(gltf.animations[0]);
      action.play();
    }
    gltf.scene.scale.set(0.0115, 0.0115, 0.0115);
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name !== "card") {
        child.material.reflectivity = 0.5;
        child.material.metalness = 0.5;
      }
      if (child.name === "card") {
        child.material.roughness = 0.5;
        child.material.metalness = 0.5;
      }
    });

    coin_top.value = gltf.scene.children.filter((el) => el.name === "icon1");
    coin_left.value = gltf.scene.children.filter((el) => el.name === "icon3");
    coin_right.value = gltf.scene.children.filter((el) => el.name === "icon5");
    coin_bottom_left.value = gltf.scene.children.filter(
      (el) => el.name === "icon"
    );
    coin_bottom_right.value = gltf.scene.children.filter(
      (el) => el.name === "icon2"
    );

    card_only.value = gltf.scene.children.filter((el) => el.name === "card");
    photo_only.value = gltf.scene.children.filter((el) => el.name === "photo");
    ani_coin.value = gltf.scene.children.filter((el) => el.name === "icon007");

    card_y = card_only.value[0].position.y;
    photo_y = photo_only.value[0].position.y;
    ani_coin_y = ani_coin.value[0].position.y;

    card_rotation_y = card_only.value[0].rotation.y;
    photo_rotation_y = photo_only.value[0].rotation.y;
    ani_coin_rotation_y = ani_coin.value[0].rotation.y;

    card_only.value[0].position.y = -130 + card_y;
    photo_only.value[0].position.y = -130 + photo_y;

    photo_only.value[0].rotation.y = -3;
    card_only.value[0].rotation.y = -3;
    ani_coin.value[0].rotation.y = -3;

    gsap.to(card_only.value[0].position, {
      duration: 2.39,
      ease: "back.out(1.7)",
      y: card_y,
    });
    gsap.to(photo_only.value[0].position, {
      duration: 2.5,
      ease: "back.out(1.7)",
      y: photo_y,
    });
    gsap.to(ani_coin.value[0].position, {
      duration: 2.5,
      ease: "back.out(1.7)",
      y: ani_coin_y,
    });

    gsap.to(card_only.value[0].rotation, {
      duration: 2.5,
      ease: "power3.inOut",
      y: card_rotation_y,
    });
    gsap.to(photo_only.value[0].rotation, {
      duration: 2.5,
      ease: "power3.inOut",
      y: photo_rotation_y,
    });
    gsap.to(ani_coin.value[0].rotation, {
      duration: 2.5,
      ease: "power3.inOut",
      y: ani_coin_rotation_y,
    });

    card.value = gltf.scene;
    scene.add(gltf.scene);
  });

  /**
   * Camera
   */
  camera.value.position.set(0, 0, 1.5);
  scene.add(camera.value);

  /**
   * Animate
   */
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Call tick again on the next frame
    requestAnimationFrame(tick);
    if (mixer_coin.value) {
      coin_top.value[0].position.y += Math.cos(elapsedTime) * 0.05;
      coin_left.value[0].position.y += Math.sin(elapsedTime * 0.4) * 0.025;
      coin_right.value[0].position.y += Math.cos(elapsedTime * 0.8) * 0.03;
      coin_bottom_left.value[0].position.y +=
        Math.sin(elapsedTime * 0.2) * 0.05;
      coin_bottom_right.value[0].position.y +=
        Math.cos(elapsedTime * 0.2) * 0.02;

      photo_only.value[0].position.y += Math.sin(elapsedTime) * 0.02;
      card_only.value[0].position.y += Math.sin(elapsedTime) * 0.02;

      const dampingFactor = 0.25;
      const targetRotation = [
        lastMousePosition.x / 5,
        lastMousePosition.y / 5,
        0,
      ];

      easing.dampE(
        card.value.rotation,
        targetRotation,
        dampingFactor,
        elapsedTime
      );
    }

    // Render
    renderer.value.render(scene, camera.value);
  };
  const coinAnimation = () => {
    const delta = clock.getDelta();
    if (mixer_coin.value) {
      mixer_coin.value.update(delta * 12);
    }
    renderer.value.render(scene, camera.value);
    requestAnimationFrame(coinAnimation);
  };

  setRender();
  tick();
  coinAnimation();
};

const initDrawBox = () => {
  /**
   * Models
   */
  const mixer_box = ref(null);
  const box = ref(null);
  const rotateGroup = new THREE.Group();

  gltfLoader.load("box_0218824.glb", (gltf) => {
    if (gltf.animations.length > 0) {
      mixer_box.value = new THREE.AnimationMixer(gltf.scene);
      const action = mixer_box.value.clipAction(gltf.animations[0]);
      action.play();
    }
    gltf.scene.traverse((child) => {
      if (child.name === "Cube_5") {
        child.material.iridescence = 1;
        child.material.iridescenceIOR = 1;
        child.material.iridescenceThicknessRange = [100, 800];
        child.material.opacity = 0.5;
        child.material.transparent = true;
      }
    });
    gltf.scene.scale.set(0.05, 0.05, 0.05);

    gsap.to(gltf.scene.scale, {
      duration: 1,
      ease: "bounce.out",
      x: 0.1,
      y: 0.1,
      z: 0.1,
    });

    box.value = gltf.scene;
    rotateGroup.add(gltf.scene);
    rotateGroup.rotation.set(0.2, 0.8, 0.3);
    scene.add(rotateGroup);
  });

  camera.value = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.value.position.set(0, 3, 15);
  scene.add(camera.value);

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Call tick again on the next frame
    requestAnimationFrame(tick);
    if (mixer_box.value) {
      const dampingFactor = 0.25;
      const targetRotation = [
        lastMousePosition.x / 5,
        lastMousePosition.y / 5,
        0,
      ];
      easing.dampE(
        box.value.rotation,
        targetRotation,
        dampingFactor,
        elapsedTime
      );
    }

    // Render
    renderer.value.render(scene, camera.value);
  };

  setRender();
  tick();
};

const initSphere = () => {
  const loader = new DRACOLoader();
  loader.setDecoderPath("draco/");
  loader.preload();
  gltfLoader.setDRACOLoader(loader);
  const target = [];
  const vector = new THREE.Vector3();
  let instancedMesh1, instancedMesh2;

  for (let i = 0, l = 48; i < l; i++) {
    const phi = Math.acos(-1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi * 1.19;
    const object = new THREE.Object3D();
    object.position.setFromSphericalCoords(8, phi, theta);
    vector.copy(object.position).multiplyScalar(2);
    object.lookAt(vector);
    target.push(object);
  }
  gltfLoader.load("project-baked-2.glb", (gltf) => {
    const nodes = gltf.scene.children[0];
    const geometry1 = nodes.children.find(
      (node) => node.name === "平面020"
    ).geometry;
    const material1 = nodes.children.find(
      (node) => node.name === "平面020"
    ).material;

    const geometry2 = nodes.children.find(
      (node) => node.name === "平面020_1"
    ).geometry;
    const material2 = nodes.children.find(
      (node) => node.name === "平面020_1"
    ).material;

    const count = 48; // Number of instances

    instancedMesh1 = new THREE.InstancedMesh(geometry1, material1, count);
    instancedMesh2 = new THREE.InstancedMesh(geometry2, material2, count);

    const dummy = new THREE.Object3D();

    // Apply transformations to each instance
    for (let i = 0; i < count; i++) {
      // Set the dummy object's position and rotation
      dummy.position.copy(target[i].position);
      dummy.rotation.copy(target[i].rotation);
      // Create a rotation matrix for 180 degrees around Y-axis
      dummy.rotateY(Math.PI);
      // Update the dummy object's matrix
      dummy.updateMatrix();
      instancedMesh1.setMatrixAt(i, dummy.matrix);
      instancedMesh2.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh1.instanceMatrix.needsUpdate = true;
    instancedMesh2.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh1);
    scene.add(instancedMesh2);
  });
  camera.value.position.set(0, 0, 20);
  scene.add(camera.value);

  const tick = () => {
    requestAnimationFrame(tick);
    controls.value.update();
    renderer.value.render(scene, camera.value);
  };

  setRender();
  controls.value.autoRotate = true;
  tick();
};

const setRender = () => {
  canvas.value = document.querySelector("canvas.project");
  renderer.value = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
  });
  renderer.value.setClearColor(0x000000, 0);
  renderer.value.shadowMap.enabled = true;
  renderer.value.setSize(sizes.width, sizes.height - 16);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  controls.value = new OrbitControls(camera.value, renderer.value.domElement);
  controls.value.update();
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

const onMouseMove = (event) => {
  setTimeout(() => {
    lastMousePosition.y = event.clientX / sizes.width - 0.5;
    lastMousePosition.x = event.clientY / sizes.height - 0.5;
  }, 150);
};

const functionCaller = () => {
  switch (props.project) {
    case "Card":
      return initCard();
    case "Card-Init":
      return initCoinCard();
    case "DrawBox":
      return initDrawBox();
    case "Sphere":
      return initSphere();
    default:
      return "";
  }
};

onMounted(() => {
  setTimeout(() => {
    window.addEventListener("resize", onResize);
    tracking.value = document.getElementById("project_dialog");
    sizes.width = tracking.value.offsetWidth;
    sizes.height = tracking.value.offsetHeight;
    tracking.value.addEventListener("mousemove", onMouseMove);
    camera.value = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      100
    );
    functionCaller();
  }, 300);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  tracking.value.removeEventListener("mousemove", onMouseMove);
});
</script>

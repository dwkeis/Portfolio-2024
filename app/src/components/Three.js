import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { ref } from "vue";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { gsap } from "gsap";
import { easing } from "maath";

export const Coin = (sizes) => {
  const scene = new THREE.Scene();
  scene.background = null; // new THREE.Color("#F6F2EC");
  const canvas = ref(null);
  const renderer = ref(null);
  const mixer = ref(null);

  const rgbeLoader = new RGBELoader();

  /**
   * Models
   */
  const medal = ref(null);
  const gltfLoader = new GLTFLoader();

  /** for id card */
  rgbeLoader.load("HDR_029_Sky_Cloudy_Env.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap;
  });
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
    medal.value = gltf.scene;
    gltf.scene.rotation.set(0, 2.5, 0);
    scene.add(gltf.scene);
  });
  /**
   * Sizes
   */

  /**
   * Camera
   */
  // Base camera
  const camera = ref(
    new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
  );
  camera.value.position.set(-1.7, 0.05, 1.3);
  scene.add(camera.value);

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  let lastMousePosition = { x: 0, y: 0 };
  let intro = true;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Call tick again on the next frame
    requestAnimationFrame(tick);
    if (mixer.value) {
      if (intro) {
        gsap.to(camera.value.position, {
          duration: 1.2,
          x: 0,
          y: 0,
        });
        gsap.to(medal.value.rotation, {
          duration: 1.5,
          x: 0,
          y: 0,
          onComplete: () => {
            intro = false;
          },
        });
      } else {
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
      }
      medal.value.rotation.y += Math.cos(elapsedTime) * 0.08;
      medal.value.rotation.x += Math.sin(elapsedTime) * 0.08;
    }

    // Render
    renderer.value.render(scene, camera.value);
  };

  const coinAnimation = () => {
    const delta = clock.getDelta();
    if (mixer.value) {
      mixer.value.update(delta * 20);
    }
    renderer.value.render(scene, camera.value);
    requestAnimationFrame(coinAnimation);
  };

  canvas.value = document.querySelector("canvas.project");
  renderer.value = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
  });
  renderer.value.setClearColor(0x000000, 0);
  renderer.value.shadowMap.enabled = true;
  renderer.value.setSize(sizes.width - 16, sizes.height - 16);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  window.addEventListener("resize", () => {
    canvas.value = document.getElementById("project_area");

    // Update sizes
    sizes.width = canvas.value.offsetWidth - 16;
    sizes.height = canvas.value.offsetHeight - 16;

    // Update camera
    camera.value.aspect = sizes.width / sizes.height;
    camera.value.updateProjectionMatrix();

    // Update renderer
    renderer.value.setSize(sizes.width, sizes.height);
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  let tracking = document.getElementById("project_area");
  tracking.addEventListener("mousemove", (event) => {
    setTimeout(() => {
      lastMousePosition.y = event.clientX / sizes.width - 0.5;
      lastMousePosition.x = event.clientY / sizes.height - 0.5;
    }, 150);
  });

  tick();
  coinAnimation();
};

export const CoinCard = () => {};

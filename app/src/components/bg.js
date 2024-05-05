import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AsciiEffect } from 'src/components/AsciiEffect.js';

export const initThree = (canvas) => {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#F6F2EC');

  // Sizes
  const sizes = {
    width: 1000,
    height: 1000,
  };

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });

  // Ascii Effect
  const asciiEffect = new AsciiEffect(renderer);
  asciiEffect.setSize(sizes.width, sizes.height);
  asciiEffect.domElement.style.color = '#ffffff'; // Change ASCII color if needed
  asciiEffect.domElement.style.backgroundColor = '#000000'; // Change background color if needed

  // Point light
  const pointLight = new THREE.PointLight(0xff9000, 1.5);
  pointLight.position.set(1, 1, 1);
  scene.add(pointLight);

  // Sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x2194ce,
    shininess: 100,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 2;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Append the ASCII effect's DOM element instead of the regular renderer's DOM element
  document.body.appendChild(asciiEffect.domElement);

  // Animate
  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    requestAnimationFrame(tick);

    const x = Math.sin(elapsedTime) * 2;
    const y = Math.sin(elapsedTime) * Math.cos(elapsedTime);
    const z = Math.cos(elapsedTime) * 2;
    pointLight.position.set(x, y, z);

    // Render scene with ASCII effect
    asciiEffect.render(scene, camera);
  };
  tick();
};

<!-- components/AnimatedSphere.vue -->
<template>
  <div id="animated-sphere">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { Canvas, useFrame } from "@react-three/fiber";

export default {
  setup() {
    const canvas = ref(null);

    onMounted(() => {
      canvas.value = document.querySelector("canvas.webgl");
      // This is needed because `react-three-fiber` relies on the document being available.
      // Quasar might render components before the document is ready.
      const app = new Canvas({
        canvas: canvas.value,
        gl: { antialias: true }, // WebGL settings
      });

      app.scene.background = new THREE.Color(0xf0f0f0);

      const sphere = new SphereGeometry(1, 32, 32);
      const sphereMaterial = new MeshPhongMaterial({
        color: 0x2194ce,
        shininess: 100,
      });
      const sphereMesh = new Mesh(sphere, sphereMaterial);
      app.scene.add(sphereMesh);

      const pointLight = new PointLight(0xffffff, 1, 100);
      pointLight.position.set(1, 1, 1);
      app.scene.add(pointLight);

      let time = 0;

      useFrame(() => {
        time += 0.01;
        const x = Math.sin(time) * 2;
        const y = Math.sin(time) * Math.cos(time);
        const z = Math.cos(time) * 2;
        pointLight.position.set(x, y, z);
      });
    });

    return { canvas };
  },
};
</script>

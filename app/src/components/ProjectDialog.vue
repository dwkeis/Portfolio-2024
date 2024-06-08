<template>
  <q-dialog v-model="myShow">
    <q-card class="w:70vw h:70vh column">
      <div class="w:full h:fit p:16 flex jc:space-between ai:center">
        <div class="font-weight:700 f:24">{{ project }}</div>
        <q-btn icon="close" flat round v-close-popup />
      </div>

      <div id="project_area" class="w:full h:85% p:16">
        <canvas class="project overflow:hidden! w:full h:full"></canvas>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { Coin, CoinCard } from "src/components/Three.js";

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

const functionsMap = {
  Coin, // Assuming Coin is one of the functions you want to call
  CoinCard,
};

onMounted(() => {
  setTimeout(() => {
    let text = document.getElementById("project_area");
    let sizes = { width: text.offsetWidth, height: text.offsetHeight };

    console.log(props.project);
    if (functionsMap[props.project]) {
      functionsMap[props.project](sizes);
    } else {
      console.error(`Function ${props.project} is not defined.`);
    }
  }, 300);
});
</script>

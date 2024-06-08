<template>
  <div class="row jc:space-between">
    <div class="font-weight:700 z:999">
      <div
        v-for="nav in routes"
        :key="nav.label"
        class="hover2 cursor:pointer my:8"
      >
        <span
          v-if="selected !== nav.label"
          :id="nav.label"
          @click="selectLabel(nav.label)"
          >{{ nav.label }}</span
        >
        <span v-else id="dot">●</span>
      </div>
    </div>
    <div
      id="page-content"
      class="abs right:calc(32px*2) bottom:calc(32px*2) {right:calc(16px*2);bottom:calc(16px*2)}@<md z:999"
    >
      <div v-if="selected === 'Home'" class="f:bold w:200">
        <div>Created and shaped in 🇲🇴</div>
        <div>Refined and living in 🇹🇼</div>
        <div>A 🇵🇹 due to historic problem.</div>
        <div class="mt:14">With a fervent passion for football,</div>
        <div>I devote a significant portion of my time to the sport.</div>
        <div>Similarly, as a developer,</div>
        <div>I am constantly engaged in experimentation and</div>
        <div>exploration to refine my skills and knowledge.</div>
      </div>
      <div v-if="selected === 'Project'" class="">
        <ProjectPicker />
      </div>
      <div v-if="selected === 'FAQ'" class="f:13">
        <div v-for="fact in FunFacts" :key="fact">
          <div class="font-weight:400 my-font">
            {{ fact.title }}
          </div>
          <div class="font-weight:600">{{ fact.detail }}</div>
        </div>
      </div>
      <div v-if="selected === 'Contact'" class="">
        <a
          class="my-href hover2 row ai:center gap:4"
          href="mailto:kcmabbchu@duck.com"
        >
          Contact me through Email
          <q-icon name="open_in_new"></q-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectPicker from "./ProjectPicker.vue";

const emit = defineEmits(["update"]);

const selected = ref("Home");
const routes = ref([
  {
    label: "Home",
  },
  {
    label: "Project",
  },
  {
    label: "FAQ",
  },
  {
    label: "Contact",
  },
]);
const FunFacts = ref([
  {
    title: "The Nobel Prize in Literature",
    detail: "2004 Reader",
  },
  {
    title: "Mega Millions lottery project",
    detail: "Participants",
  },
  {
    title: "Shopping Platform",
    detail: "Experienced Consumers",
  },
  {
    title: "Famous Convenient Store",
    detail: "Coffee cupping expert",
  },
  {
    title: "VSCO",
    detail: "Annual Membership",
  },
]);

const selectLabel = (val) => {
  let element = document.getElementById("page-content");
  element.className =
    "abs right:calc(32px*2) bottom:calc(32px*2) {right:calc(16px*2);bottom:calc(16px*2)}@<md opacity:0 transition:opacity|300ms z:999";
  setTimeout(() => {
    element.className =
      "abs right:calc(32px*2) bottom:calc(32px*2) {right:calc(16px*2);bottom:calc(16px*2)}@<md opacity:1 transition:opacity|300ms z:999";
    selected.value = val;
  }, 300);
  emit("update", val);
};
</script>
<style>
.my-href {
  text-decoration-line: none;
  color: inherit;
}
</style>

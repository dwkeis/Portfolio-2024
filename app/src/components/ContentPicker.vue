<template>
  <div class="row jc:space-between">
    <div class="font-weight:700">
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
    <div id="page-content" class="abs right:calc(32px*2) bottom:calc(32px*2)">
      <div v-if="selected === 'Home'" class="f:bold w:200">
        <div>Created and shaped in 🇲🇴</div>
        <div>Refined and living in 🇹🇼</div>
        <div>A 🇵🇹 due to historic problem.</div>
        <div class="mt:14">Passionate about football</div>
        <div>spent most of time enjoying it.</div>
        <div>Same way as a developer,</div>
        <div>always exploring through experiments.</div>
      </div>
      <div v-if="selected === 'Project'" class="">456</div>
      <div v-if="selected === 'FAQ'" class="f:13">
        <div class="font-weight:400 my-font">The Nobel Prize in Literature</div>
        <div class="font-weight:600">2004 Reader</div>
        <div class="font-weight:400 my-font">Mega Millions lottery project</div>
        <div class="font-weight:600">Participants</div>
        <div class="font-weight:400 my-font">Shopping Platform</div>
        <div class="font-weight:600">Experienced Consumers</div>
        <div class="font-weight:400 my-font">Famous Convenient Store</div>
        <div class="font-weight:600">Coffee cupping expert</div>
        <div class="font-weight:400 my-font">VSCO</div>
        <div class="font-weight:600">Annual Pro Member</div>
      </div>
      <div v-if="selected === 'Contact'" class="">
        <a class="my-href hover2" href="mailto:kcmabbchu@duck.com">
          Contact me through Email.
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

const selectLabel = (val) => {
  let element = document.getElementById("page-content");
  element.className =
    "abs right:calc(32px*2) bottom:calc(32px*2) opacity:0 transition:opacity|300ms";
  setTimeout(() => {
    element.className =
      "abs right:calc(32px*2) bottom:calc(32px*2) opacity:1 transition:opacity|300ms";
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

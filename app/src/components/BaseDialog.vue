<template>
  <q-dialog
    v-model="myShow"
    data-cy="dialog"
    :persistent="persistent"
    class="next"
    @input="$emit('input')"
    @show="$emit('show')"
    @before-hide="$emit('before-hide')"
  >
    <q-card
      :style="{
        'min-width': width,
        'min-height': minHeight,
        'max-width': maxWidth,
        'max-height': '90vh',
        height: height,
        display: 'flex',
        'flex-direction': 'column',
      }"
    >
      <q-card-section v-if="showHeader" :class="headerClass">
        <slot name="header"></slot>
        <q-space></q-space>
        <slot name="button"></slot>
        <q-btn
          v-if="isCloseBtnShow"
          v-close-popup
          data-cy="close-btn"
          icon="close"
          :class="buttonClass"
          flat
          round
        ></q-btn>
        <slot name="subtitle"></slot>
      </q-card-section>
      <q-separator v-if="isHeaderSeparator" />

      <q-card-section :class="bodyClass">
        <q-scroll-area
          v-if="isScroll"
          :style="{ width: 'inherit', height: scrollHeight }"
          :content-style="{ position: 'inherit' }"
        >
          <slot name="body"></slot>
        </q-scroll-area>
        <slot v-else name="body"></slot>
      </q-card-section>
      <q-separator v-if="isFooterSeparator" />
      <q-card-actions v-if="isFooter" :class="footerClass" :align="footerAlign">
        <slot name="footer"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "BaseDialog",
  props: {
    dialogShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "40vw",
    },
    maxWidth: {
      type: String,
      default: undefined,
    },
    minHeight: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    footerAlign: {
      type: String,
      default: "evenly",
    },
    headerClass: {
      type: String,
      default: "row ai:center p:16 pb:0 ",
    },
    bodyClass: {
      type: String,
      default: "px:40",
    },
    footerClass: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: String,
      default: "p:0!",
    },
    isCloseBtnShow: {
      type: Boolean,
      default: true,
    },
    isFooterSeparator: {
      type: Boolean,
      default: false,
    },
    isHeaderSeparator: {
      type: Boolean,
      default: false,
    },
    scrollHeight: {
      type: String,
      default: "54.5vh",
    },
    isScroll: {
      type: Boolean,
      default: false,
    },
    isFooter: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:dialogShow", "input", "show", "before-hide"],
  setup(props, { emit }) {
    const myShow = computed({
      get: () => props.dialogShow,
      set: (value) => emit("update:dialogShow", value),
    });

    return {
      myShow,
    };
  },
});
</script>

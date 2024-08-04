import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    useLightTheme: false,
  }),
  getters: {
    getLightTheme: (state) => {
      return state.useLightTheme;
    },
  },
  actions: {
    setLightTheme(theme) {
      this.useLightTheme = theme;
    },
  },
});

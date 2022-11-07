import { defineStore } from "pinia";

export const useLangStore = defineStore({
  id: "language",
  state: () => {
    return {
      localeLang: sessionStorage.getItem("localeLang") || "zh",
    };
  },
  actions: {
    updateLang(lang: string) {
      this.localeLang = lang;
    },
  },

  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       storage: sessionStorage,
  //       paths: ["localeLang"],
  //     },
  //   ],
  // },
});

import { createI18n } from "vue-i18n";
import zh from "./zh";
import jp from "./jp";

const i18n = createI18n({
  locale: sessionStorage.getItem("locationLant") || "zh",
  messages: {
    zh,
    jp,
  },
});

export default i18n;

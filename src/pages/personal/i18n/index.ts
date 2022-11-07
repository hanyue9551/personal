import { createI18n } from "vue-i18n";
import zh from "./zh";
import jp from "./jp";

const i18n = createI18n({
  legacy: false, // 解决Uncaught SyntaxError: Not available in legacy mode
  locale: sessionStorage.getItem("localLang") || "zh",
  messages: {
    zh,
    jp,
  },
});

export default i18n;

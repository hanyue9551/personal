const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    management: {
      entry: "src/pages/management/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: "后台管理",
    },
    personal: {
      entry: "src/pages/personal/main.ts",
      template: "public/personal.html",
      filename: "personal.html",
      title: "个人站",
    },
  },
});

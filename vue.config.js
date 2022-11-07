const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    personal: {
      entry: "src/pages/personal/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: "个人站",
    },
    management: {
      entry: "src/pages/management/main.ts",
      template: "public/management.html",
      filename: "management.html",
      title: "后台管理",
    },
  },
});

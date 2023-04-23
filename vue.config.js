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
  lintOnSave: false, //是否开启eslint
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // express服务器的地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});

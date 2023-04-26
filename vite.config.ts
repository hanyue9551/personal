import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import mpaPlugin from 'vite-plugin-mpa-plus'
import type { Rewrite, Pages } from 'vite-plugin-mpa-plus'

// 子页面路由重定向 不然会找不到资源
const rewrites: Array<Rewrite> = [{
  from: /\/personal/, to: '/personal/index.html' 
}]
export default defineConfig({
  plugins: [
    vue(),
    mpaPlugin({
      historyApiFallback: {
        rewrites
      }
    })
  ],
  root: "src/pages",
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/pages/index.html"),
        personal: path.resolve(__dirname, "src/pages/personal/index.html")
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, "src"),
      },
    ]
  }
})
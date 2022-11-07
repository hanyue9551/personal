import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LayoutMenu from "../LayoutMenu/LayoutMenu.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/management",
    name: "management",
    component: LayoutMenu,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import LayoutMenu from "../LayoutMenu/LayoutMenu.vue";
import HomeView from "../views/Home/HomeView.vue";
import MeView from "../views/Me/MeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/me",
    name: "me",
    component: MeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

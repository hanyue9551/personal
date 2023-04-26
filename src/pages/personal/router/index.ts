import { createRouter, createWebHistory } from "vue-router";
import LayoutMenu from "../LayoutMenu/LayoutMenu.vue";
import HomeView from "../views/Home/HomeView.vue";
import MeView from "../views/Me/MeView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes : [
    {
      path: "/personal",
      name: "personal",
      component: LayoutMenu,
      children: [
        {
          path: "home",
          name: "home",
          component: HomeView,
        },
        {
          path: "me",
          name: "me",
          component: MeView,
        },
      ],
    },
  ],
});

export default router;

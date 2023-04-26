import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LayoutMenu from "../LayoutMenu/LayoutManagementMenu.vue";
import ManagementIndex from "../views/ManagementIndex/ManagementIndex.vue";
import UserManagement from "../views/User/UserManagement.vue";
import BlogManagement from "../views/Blog/BlogManagement.vue";
import TagManagement from "../views/Tag/TagManagement.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login/LoginView.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/Login/RegisterView.vue"),
  },
  {
    path: "/management",
    name: "management",
    component: LayoutMenu,
    children: [
      {
        path: "",
        name: "managementIndex",
        component: ManagementIndex,
      },
      {
        path: "user",
        name: "user",
        component: UserManagement,
      },
      {
        path: "blog",
        name: "blog",
        component: BlogManagement,
      },
      {
        path: "tags",
        name: "tags",
        component: TagManagement,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound/NotfoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LayoutMenu from "../LayoutMenu/LayoutManagementMenu.vue";
import ManagementIndex from "../views/ManagementIndex/ManagementIndex.vue";
import UserManagement from "../views/User/UserManagement.vue";
import BlogManagement from "../views/Blog/BlogManagement.vue";
import TagManagement from "../views/Tag/TagManagement.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/management",
    name: "management",
    component: LayoutMenu,
    children: [
      {
        path: "/managementIndex",
        name: "managementIndex",
        component: ManagementIndex,
      },
      {
        path: "/user",
        name: "user",
        component: UserManagement,
      },
      {
        path: "/blog",
        name: "blog",
        component: BlogManagement,
      },
      {
        path: "/tag",
        name: "tag",
        component: TagManagement,
      },
    ],
  },
  // {
  //   path: "/user",
  //   name: "user",
  //   component: UserManagement,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

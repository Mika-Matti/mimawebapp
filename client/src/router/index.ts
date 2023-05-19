import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import AboutView from "../views/AboutView.vue";
import ProjectView from "../views/ProjectView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/projects/:id",
    name: "project",
    component: ProjectView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

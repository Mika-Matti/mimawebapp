import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ProjectView from "../views/ProjectView.vue";
import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
import EditorView from "../views/EditorView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:object/:id/edit",
    name: "edit",
    component: EditorView,
  },
  {
    path: "/create/:object",
    name: "create",
    component: EditorView,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
  },
  {
    path: "/projects/:id",
    name: "project",
    component: ProjectView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

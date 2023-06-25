import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ProjectView from "../views/ProjectView.vue";
import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
import EditorView from "../views/EditorView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: false }, // Set requiresAuth to false for public
  },
  {
    path: "/:object/:id/edit",
    name: "edit",
    component: EditorView,
    meta: { requiresAuth: true }, // Set requiresAuth to true for protected routes
  },
  {
    path: "/create/:object",
    name: "create",
    component: EditorView,
    meta: { requiresAuth: true }, // Set requiresAuth to true for protected routes
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
    meta: { requiresAuth: false }, // Set requiresAuth to false for public
  },
  {
    path: "/projects/:id",
    name: "project",
    component: ProjectView,
    meta: { requiresAuth: false }, // Set requiresAuth to false for public
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { requiresAuth: false }, // Set requiresAuth to false for public
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: false }, // Set requiresAuth to false for public
  },
  {
    path: "/:catchAll(.*)", // Handle nonexisting routes
    name: "NotFound",
    component: NotFoundView,
    meta: { requiresAuth: false }, // Set requiresAuth to false for public
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.getIsAuthenticated;
  const role = store.getters.getRole;
  const isAuthorized = () => isAuthenticated.value && role.value === "admin";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthorized) {
    next({ name: "NotFound" });
  } else {
    next();
  }
});

export default router;

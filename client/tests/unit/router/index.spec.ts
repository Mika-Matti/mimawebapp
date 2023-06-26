import { createRouter, createWebHistory, Router } from "vue-router";
import router from "@/router/index";
import store from "@/store";

describe("Router", () => {
  beforeEach(() => {
    store.commit("setIsAuthenticated", false);
    store.commit("setRole", "guest");
  });

  it("should redirect to 404 page for protected routes when unauthenticated", async () => {
    await router.push("/create/project");
    await router.isReady(); // Wait for router navigation to complete

    expect(router.currentRoute.value.name).toBe("NotFound");
  });

  it("should pass router guard for protected routes when authenticated", async () => {
    store.commit("setIsAuthenticated", true);
    store.commit("setRole", "admin");

    await router.push("/create/project");
    await router.isReady(); // Wait for router navigation to complete

    expect(router.currentRoute.value.name).toBe("create");
  });
});

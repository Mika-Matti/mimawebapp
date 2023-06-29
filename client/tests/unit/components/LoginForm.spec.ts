import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import LoginForm from "@/components/LoginForm.vue";

describe("LoginForm-component", () => {
  it("should render form-group if not authenticated", () => {
    const store = createStore({
      getters: {
        getIsAuthenticated: () => false,
        getUsername: () => "",
        getRole: () => "guest",
        getExpiration: () => 0,
      },
    });

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };

    const wrapper = mount(LoginForm, mountConfig);

    expect(wrapper.find(".form-group").exists()).toBe(true);
    expect(wrapper.find(".button").exists()).toBe(true);
  }); // Test case ends

  it("should render login-welcome if user is authenticated", () => {
    const store = createStore({
      getters: {
        getIsAuthenticated: () => true,
        getUsername: () => "JohnDoe",
        getRole: () => "admin",
        getExpiration: () => 3600000,
      },
    });

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };

    const wrapper = mount(LoginForm, mountConfig);
    expect(wrapper.find(".login-welcome").exists()).toBe(true);
    expect(wrapper.find(".text-loggedin").exists()).toBe(true);
  }); // Test case ends

  it("should watch for changes in store for whether user isAuthenticated or not", async () => {
    const store = createStore({
      state: {
        isAuthenticated: false,
        username: "",
        role: "guest",
        expiration: 0,
      },
      mutations: {
        setIsAuthenticated(state, isAuthenticated) {
          state.isAuthenticated = isAuthenticated;
        },
        setUsername(state, username) {
          state.username = username;
        },
        setRole(state, role) {
          state.role = role;
        },
        setExpiration(state, expiration) {
          state.expiration = expiration;
        },
      },
      getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUsername: (state) => state.username,
        getRole: (state) => state.role,
        getExpiration: (state) => state.expiration,
      },
    });

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };

    const wrapper = mount(LoginForm, mountConfig);

    expect(wrapper.vm.isAuthenticated).toBe(false);

    // Update store state to simulate authentication
    store.commit("setIsAuthenticated", true);
    store.commit("setUsername", "JohnDoe");
    store.commit("setRole", "admin");
    store.commit("setExpiration", Date.now() + 36000000);

    // Wait for the next tick to allow properties to update
    await wrapper.vm.$nextTick();

    // Assert watched changes update state
    expect(wrapper.vm.isAuthenticated).toBe(true);
  }); // Test case ends
});

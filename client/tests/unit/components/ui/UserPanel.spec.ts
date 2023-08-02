import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { onBeforeUnmount } from "vue";
import UserPanel from "@/components/ui/UserPanel.vue";

describe("UserPanel-component", () => {
  it("should render empty user-panel when not logged in", () => {
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

    const wrapper = mount(UserPanel, mountConfig);

    expect(wrapper.find(".user-panel").exists()).toBe(true);
    expect(wrapper.find(".user-items").exists()).toBe(false);
    expect(wrapper.find(".button").exists()).toBe(false);
  }); // Test case ends

  it("should render full user-panel when logged in", () => {
    const store = createStore({
      getters: {
        getIsAuthenticated: () => true,
        getUsername: () => "JohnDoe",
        getRole: () => "admin",
        getExpiration: () => 1000000000,
      },
    });

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };

    const wrapper = mount(UserPanel, mountConfig);

    expect(wrapper.find(".user-panel").exists()).toBe(true);
    expect(wrapper.find(".user-items").exists()).toBe(true);
    expect(wrapper.find(".button").exists()).toBe(true);
  }); // Test case ends

  it("should update computed properties based on the store", async () => {
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

    const wrapper = mount(UserPanel, mountConfig);

    // Wait for the next tick to allow computed properties to update
    await wrapper.vm.$nextTick();

    // Assert initial state
    expect(wrapper.vm.isAuthenticatedRef).toBe(false);
    expect(wrapper.vm.username).toBe("");
    expect(wrapper.vm.role).toBe("guest");
    expect(wrapper.vm.sessionTime).toBeLessThanOrEqual(0);

    // Update store state to simulate authentication
    store.commit("setIsAuthenticated", true);
    store.commit("setUsername", "JohnDoe");
    store.commit("setRole", "admin");
    store.commit("setExpiration", Date.now() + 36000000);

    // Wait for the next tick to allow computed properties to update
    await wrapper.vm.$nextTick();

    // Assert updated state after authentication
    expect(wrapper.vm.isAuthenticatedRef).toBe(true);
    expect(wrapper.vm.username).toBe("JohnDoe");
    expect(wrapper.vm.role).toBe("admin");
    expect(wrapper.vm.sessionTime).toBeGreaterThan(0);
  }); // Test case ends

  it("should set displayMessage when logout is called for five seconds", async () => {
    jest.useFakeTimers();
    const mockLogout = jest.fn();

    const store = createStore({
      state: {
        isAuthenticated: true,
        username: "JohnDoe",
        role: "admin",
        expiration: 1000,
      },
      getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUsername: (state) => state.username,
        getRole: (state) => state.role,
        getExpiration: (state) => state.expiration,
      },
    });

    store.dispatch = mockLogout;

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };
    const wrapper = mount(UserPanel, mountConfig);

    jest.runOnlyPendingTimers(); // Run the timers

    await wrapper.vm.$nextTick(); // Wait for the next tick to allow changes to propagate

    expect(mockLogout).toHaveBeenCalled();

    jest.advanceTimersByTime(100); // Fast-forward 100ms

    expect(wrapper.vm.displayMessage).toBe("You are no longer logged in");

    jest.advanceTimersByTime(5000); // Fast-forward 5 seconds

    expect(wrapper.vm.displayMessage).toBe(null);
  }); // Test case ends

  it("should set displayMessage when logout fails and dispatch returns an error message", async () => {
    const mockLogout = jest.fn().mockResolvedValue("Logout failed");

    const store = createStore({
      state: {
        isAuthenticated: true,
        username: "JohnDoe",
        role: "admin",
        expiration: 1000,
      },
      getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUsername: (state) => state.username,
        getRole: (state) => state.role,
        getExpiration: (state) => state.expiration,
      },
    });

    store.dispatch = mockLogout;

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };
    const wrapper = mount(UserPanel, mountConfig);

    await wrapper.vm.logout();

    expect(mockLogout).toHaveBeenCalled();
    expect(wrapper.vm.displayMessage).toBe("Logout failed");
  }); // Test case ends
});

import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import AdminPanel from "@/components/ui/AdminPanel.vue";

describe("AdminPanel-component", () => {
  it("should not render adminpanel when not logged in", () => {
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

    const wrapper = mount(AdminPanel, mountConfig);

    expect(wrapper.find(".admin-panel").exists()).toBe(false);
    expect(wrapper.find(".view-options").exists()).toBe(false);
  }); // Test case ends

  it("should render adminpanel when user is logged in", () => {
    const store = createStore({
      getters: {
        getIsAuthenticated: () => true,
        getUsername: () => "JohnDoe",
        getRole: () => "admin",
        getExpiration: () => 360000,
      },
    });

    const mountConfig = {
      global: {
        plugins: [store],
      },
    };

    const wrapper = mount(AdminPanel, mountConfig);

    expect(wrapper.find(".admin-panel").exists()).toBe(true);
    expect(wrapper.find(".view-options").exists()).toBe(true);
  }); // Test case ends
});

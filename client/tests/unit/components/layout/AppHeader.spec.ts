import { shallowMount } from "@vue/test-utils";
import AppHeader from "@/components/layout/AppHeader.vue";
import UserPanel from "@/components/ui/UserPanel.vue";

describe("AppHeader.vue", () => {
  it("should render the UserPanel component", () => {
    const mountConfig = {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    };
    const wrapper = shallowMount(AppHeader, mountConfig);

    expect(wrapper.findComponent(UserPanel).exists()).toBe(true);
  });
});

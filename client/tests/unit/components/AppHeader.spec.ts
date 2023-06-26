import { shallowMount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader.vue";
import UserPanel from "@/components/UserPanel.vue";

describe("AppHeader.vue", () => {
  it("should render the UserPanel component", () => {
    const wrapper = shallowMount(AppHeader);

    expect(wrapper.findComponent(UserPanel).exists()).toBe(true);
  });
});

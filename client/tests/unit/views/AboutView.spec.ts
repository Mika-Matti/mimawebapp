import { shallowMount } from "@vue/test-utils";
import AboutView from "@/views/AboutView.vue";
import PageHeader from "@/components/PageHeader.vue";

describe("AboutView", () => {
  it("should render the view properly", () => {
    const wrapper = shallowMount(AboutView);

    expect(wrapper.find(".about").exists()).toBe(true);
    expect(wrapper.find(".about-content").exists()).toBe(true);
    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
  }); // Test case ends
});

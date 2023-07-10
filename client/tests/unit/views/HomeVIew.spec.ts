import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import PageHeader from "@/components/PageHeader.vue";

describe("HomeView", () => {
  it("should render the view properly", () => {
    const wrapper = shallowMount(HomeView);

    expect(wrapper.find(".home").exists()).toBe(true);
    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
  }); // Test case ends
});

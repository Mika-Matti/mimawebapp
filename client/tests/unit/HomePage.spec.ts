import { shallowMount } from "@vue/test-utils";
import HomePage from "@/components/HomePage.vue";

describe("HomePage.vue", () => {
  it("renders props.pageHeader when passed", () => {
    const pageHeader = "new pageHeader";
    const wrapper = shallowMount(HomePage, {
      props: { pageHeader },
    });
    expect(wrapper.text()).toMatch(pageHeader);
  });
});

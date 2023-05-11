import { shallowMount } from "@vue/test-utils";
import HomePage from "@/components/HomePage.vue";

describe("HomePage.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HomePage, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

import { shallowMount } from "@vue/test-utils";
import AdminView from "@/views/AdminView.vue";
import PageHeader from "@/components/ui/PageHeader.vue";
import LoginForm from "@/components/LoginForm.vue";

describe("AdminView", () => {
  it("should render the view properly", () => {
    const wrapper = shallowMount(AdminView);

    expect(wrapper.find(".admin").exists()).toBe(true);
    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(LoginForm).exists()).toBe(true);
  });
});

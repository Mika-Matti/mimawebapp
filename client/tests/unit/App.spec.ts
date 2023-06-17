import { shallowMount } from "@vue/test-utils";
import { RouterView } from "vue-router";
import App from "@/App.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import router from "@/router";

const mountConfig = {
  global: {
    plugins: [router],
  },
  stubs: {
    RouterLink: true,
    RouterView: RouterView,
  },
};

describe("App.vue", () => {
  it("should render Appheader and AppFooter components", () => {
    const wrapper = shallowMount(App, mountConfig);

    expect(wrapper.findComponent(AppHeader).exists()).toBe(true);
    expect(wrapper.findComponent(AppFooter).exists()).toBe(true);
  });

  it("should render router links correctly", () => {
    const wrapper = shallowMount(App, mountConfig);

    const routerLinks = wrapper.findAll(".router-link");

    expect(routerLinks.length).toBe(3);

    expect(wrapper.html()).toContain('to="/"');
    expect(wrapper.html()).toContain('to="/projects"');
    expect(wrapper.html()).toContain('to="/about"');
  });

  it("should render the RouterView component", () => {
    const wrapper = shallowMount(App, mountConfig);

    expect(wrapper.findComponent(RouterView).exists()).toBe(true);
  });
});

import { mount, shallowMount } from "@vue/test-utils";
import PageHeader from "@/components/PageHeader.vue";
import router from "@/router";

describe("PageHeader-component", () => {
  beforeEach(() => {
    router.push("/");
    router.isReady();
  });
  it("should render pageheader class", () => {
    const mountConfig = {
      global: {
        plugins: [router],
      },
    };

    const wrapper = mount(PageHeader, mountConfig);

    expect(wrapper.find(".pageheader").exists()).toBe(true);
    expect(wrapper.vm.pageHeader).toBe("/home");
    expect(wrapper.vm.pageTitle).toBe("mimanet -");
    expect(wrapper.vm.showReturnButton).toBe(false);
    expect(document.title).toBe("mimanet - home");
  }); // Test case ends

  it("should render pageheader class with return button if directory is deep enough", async () => {
    const mountConfig = {
      global: {
        plugins: [router],
      },
    };

    expect(router.currentRoute.value.name).toBe("home");

    await router.push("/projects/1");
    await router.isReady(); // Wait for router navigation to complete

    const wrapper = mount(PageHeader, mountConfig);

    expect(wrapper.find(".pageheader").exists()).toBe(true);
    expect(wrapper.vm.pageHeader).toBe("/projects/1");
    expect(wrapper.vm.pageTitle).toBe("mimanet -");
    expect(wrapper.vm.showReturnButton).toBe(true);
  }); // Test case ends

  it("should return you to previous page if the return button is clicked", async () => {
    const mockGo = jest.fn();
    const mockCurrentRoute = {
      value: {
        path: "/projects/1",
        name: "project",
      },
    };
    const mockRouter = {
      go: mockGo,
      currentRoute: mockCurrentRoute,
    };

    const wrapper = shallowMount(PageHeader, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    // Update the values of pageHeader, pageTitle, and showReturnButton
    wrapper.vm.pageHeader = "/projects/1";
    wrapper.vm.showReturnButton = true;

    expect(wrapper.find(".pageheader").exists()).toBe(true);
    expect(wrapper.vm.pageHeader).toBe("/projects/1");
    expect(wrapper.vm.pageTitle).toBe("mimanet -");
    expect(wrapper.vm.showReturnButton).toBe(true);

    // Simulate clicking the return button
    await wrapper.vm.goToPreviousPage();

    // Verify that $router.go(-1) was called
    expect(mockGo).toHaveBeenCalledWith(-1);
  }); // Test case ends
});

describe("Pageheader calculateShowReturnButton", () => {
  beforeEach(() => {
    router.push("/");
    router.isReady();
  });

  it("should return false if the pageHeader contains more than one slash", () => {
    const mountConfig = {
      global: {
        plugins: [router],
      },
    };

    const wrapper = mount(PageHeader, mountConfig);

    expect(wrapper.find(".pageheader").exists()).toBe(true);
    expect(wrapper.vm.pageHeader).toBe("/home");
    expect(wrapper.vm.pageTitle).toBe("mimanet -");
    expect(wrapper.vm.showReturnButton).toBe(false);

    // Call the calculateShowReturnButton() method
    const result = wrapper.vm.calculateShowReturnButton();

    // Assert that the result is false
    expect(result).toBe(false);
  }); // Test case ends

  it("should return true if the pageHeader contains more than one slash", async () => {
    const mountConfig = {
      global: {
        plugins: [router],
      },
    };

    await router.push("/projects/1");
    await router.isReady(); // Wait for router navigation to complete

    const wrapper = mount(PageHeader, mountConfig);

    expect(wrapper.find(".pageheader").exists()).toBe(true);
    expect(wrapper.vm.pageHeader).toBe("/projects/1");
    expect(wrapper.vm.pageTitle).toBe("mimanet -");
    expect(wrapper.vm.showReturnButton).toBe(true);

    // Call the calculateShowReturnButton() method
    const result = wrapper.vm.calculateShowReturnButton();

    // Assert that the result is true
    expect(result).toBe(true);
  }); // Test case ends
});

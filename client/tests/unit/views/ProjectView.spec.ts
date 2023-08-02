import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "@/router";
import ProjectView from "@/views/ProjectView.vue";
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import ProjectDisplay from "@/components/ProjectDisplay.vue";
import { Project } from "@/types";

describe("ProjectView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the view properly", () => {
    const store = createStore({
      getters: {
        getProject: () => {
          return {
            project_id: 3,
            project_title: "Project C",
            project_description: "A website redesign for Company C",
            project_content: "Lorem ipsum dolor sit amet...",
            project_link: "https://www.exampleC.com",
          } as Project;
        },
      },
      actions: {
        fetchProjectById: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            params: {
              id: "3",
            },
          },
        },
      },
      stubs: {
        RouterLink: true,
      },
    };

    const wrapper = shallowMount(ProjectView, mountConfig);

    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(ProjectDisplay).exists()).toBe(true);
    expect(wrapper.findComponent(AdminPanel).exists()).toBe(true);
  }); // Test case ends

  it("should call deleteProjectById when confirmed", () => {
    const store = createStore({
      getters: {
        getProject: () => {
          return {
            project_id: 3,
            project_title: "Project C",
            project_description: "A website redesign for Company C",
            project_content: "Lorem ipsum dolor sit amet...",
            project_link: "https://www.exampleC.com",
          } as Project;
        },
      },
      actions: {
        deleteProjectById: jest.fn(),
        fetchProjectById: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            params: {
              id: "3",
            },
          },
        },
      },
      stubs: {
        RouterLink: true,
      },
    };

    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockReturnValue(true);

    const deleteProjectByIdSpy = jest.spyOn(
      ProjectView.methods as any,
      "deleteProjectById"
    );
    const dispatchMock = jest.spyOn(store, "dispatch");

    const wrapper = shallowMount(ProjectView, mountConfig);

    wrapper.vm.confirmDelete();

    expect(deleteProjectByIdSpy).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith("deleteProjectById", "3");

    mockConfirm.mockRestore();
    deleteProjectByIdSpy.mockRestore();
    dispatchMock.mockRestore();
  }); // Test case ends

  it("should not call deleteProjectById when not confirmed", () => {
    const store = createStore({
      getters: {
        getProject: () => {
          return {
            project_id: 3,
            project_title: "Project C",
            project_description: "A website redesign for Company C",
            project_content: "Lorem ipsum dolor sit amet...",
            project_link: "https://www.exampleC.com",
          } as Project;
        },
      },
      actions: {
        deleteProjectById: jest.fn(),
        fetchProjectById: jest.fn(),
      },
    });
    const mountConfig = {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            params: {
              id: "3",
            },
          },
        },
      },
      stubs: {
        RouterLink: true,
      },
    };
    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockReturnValue(false);

    const deleteProjectByIdSpy = jest.spyOn(
      ProjectView.methods as any,
      "deleteProjectById"
    );
    const dispatchMock = jest.spyOn(store, "dispatch");

    const wrapper = shallowMount(ProjectView, mountConfig);

    wrapper.vm.confirmDelete();

    expect(deleteProjectByIdSpy).not.toHaveBeenCalled();
    expect(dispatchMock).not.toHaveBeenCalledWith("deleteProjectById", "3");

    mockConfirm.mockRestore();
    deleteProjectByIdSpy.mockRestore();
    dispatchMock.mockRestore();
  }); // Test case ends
});

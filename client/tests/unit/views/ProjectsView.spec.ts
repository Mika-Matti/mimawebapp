import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { Project } from "@/types";
import router from "@/router";
import ProjectsView from "@/views/ProjectsView.vue";
import PageHeader from "@/components/PageHeader.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import ProjectNode from "@/components/ProjectNode.vue";

describe("ProjectsView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the view properly", async () => {
    const mockProjects: Project[] = [
      {
        project_title: "Project C",
        project_description: "A website redesign for Company C",
        project_content: "Lorem ipsum dolor sit amet...",
        project_id: 3,
        project_link: "https://www.exampleC.com",
        project_start_date: new Date(),
      },
      {
        project_title: "Project B",
        project_description: "A website redesign for Company B",
        project_content: "Lorem ipsum dolor sit amet...",
        project_id: 2,
        project_link: "https://www.exampleB.com",
        project_start_date: new Date(),
      },
      {
        project_title: "Project A",
        project_description: "A website redesign for Company A",
        project_content: "Lorem ipsum dolor sit amet...",
        project_id: 1,
        project_link: "https://www.exampleA.com",
        project_start_date: new Date(),
      },
    ];

    const store = createStore({
      state: {
        projects: mockProjects,
      },
      getters: {
        getProjects: (state) => state.projects,
      },
      actions: {
        fetchProjects: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        stubs: {
          RouterLink: true,
        },
      },
    };

    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const wrapper = shallowMount(ProjectsView, mountConfig);

    await wrapper.vm.$nextTick(); // Wait for component properties update

    await wrapper.vm.$forceUpdate(); // Update the view

    expect(mockDispatch).toHaveBeenCalledWith("fetchProjects");
    expect(wrapper.vm.projects.length).toBe(3);
    expect(wrapper.find(".projects").exists()).toBe(true);
    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(AdminPanel).exists()).toBe(true);
    expect(wrapper.findAllComponents(ProjectNode).length).toBe(3);
  }); // Test case ends
});

import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import Datepicker from "vue3-datepicker";
import PageHeader from "@/components/PageHeader.vue";
import ProjectDisplay from "@/components/ProjectDisplay.vue";
import EditorView from "@/views/EditorView.vue";
import { Project } from "@/types";
import { createRouter, createWebHistory } from "vue-router";

describe("EditorView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the view components properly", async () => {
    const mockRouter = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", name: "edit", component: EditorView }],
    });
    // fake router params
    mockRouter.currentRoute.value.params = {
      id: "3",
      object: "project",
    };

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
        getIsAuthenticated: () => true,
        getRole: () => "admin",
      },
      actions: {
        fetchProjectById: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, mockRouter],
      },
    };

    const wrapper = await shallowMount(EditorView, mountConfig);

    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(ProjectDisplay).exists()).toBe(true);
    expect(wrapper.findComponent(Datepicker).exists()).toBe(true);
  }); // Test case ends
});

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

  it("should render the view components properly", () => {
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

    const wrapper = shallowMount(EditorView, mountConfig);

    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(ProjectDisplay).exists()).toBe(true);
    expect(wrapper.findComponent(Datepicker).exists()).toBe(true);
  }); // Test case ends

  it("should throw console error if invalid objectType", () => {
    const mockRouter = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", name: "edit", component: EditorView }],
    });
    // fake router params
    mockRouter.currentRoute.value.params = {
      id: "3",
      object: "invalid",
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

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const wrapper = shallowMount(EditorView, mountConfig);

    const expectedObject = wrapper.vm.convertObject();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Invalid object type: ",
      mockRouter.currentRoute.value.params.object
    );
    expect(expectedObject).toBe(null);

    consoleErrorSpy.mockRestore();
  }); // Test case ends

  it("should call dispatch with right action and object", async () => {
    const mockRouter = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", name: "edit", component: EditorView }],
    });
    // fake router params
    mockRouter.currentRoute.value.params = {
      id: "3",
      object: "project",
    };
    mockRouter.currentRoute.value.path = "/edit/project/3";

    const store = createStore({
      getters: {
        getProject: () => {
          return {
            project_id: 3,
            project_title: "Project C",
            project_description: "A website redesign for Company C",
            project_content: "Lorem ipsum dolor sit amet...",
            project_link: "https://www.exampleC.com",
            project_start_date: new Date(),
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

    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const wrapper = shallowMount(EditorView, mountConfig);

    await wrapper.vm.$nextTick(); // Wait for the component to be mounted and the item to be populated

    const item = wrapper.vm.item;
    const project: Project | null = wrapper.vm.convertObject() as Project;

    await wrapper.vm.submit();

    expect(mockDispatch).toHaveBeenCalledWith("fetchProjectById", "3");
    expect(item.project_id).toBe(3);
    expect(item.project_title).toBe("Project C");
    expect(item.project_description).toBe("A website redesign for Company C");
    expect(item.project_content).toBe("Lorem ipsum dolor sit amet...");
    expect(item.project_link).toBe("https://www.exampleC.com");

    expect(mockDispatch.mock.calls[1][0]).toBe("editProject");
    expect(mockDispatch.mock.calls[1][1]).toEqual(project);
  }); // Test case ends
});

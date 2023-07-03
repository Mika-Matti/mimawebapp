import { shallowMount } from "@vue/test-utils";
import { Project } from "@/types";
import ProjectNode from "@/components/ProjectNode.vue";
import store from "@/store";
import router from "@/router";

describe("ProjectNode-component", () => {
  it("should display the project information correctly from passed prop", () => {
    const project: Project = {
      project_title: "My Project",
      project_description: "This is my project",
      project_content: "Project content goes here",
      project_id: 1,
      project_link: "https://example.com",
      project_start_date: new Date(),
    };

    const mountConfig = {
      global: {
        plugins: [router, store],
      },
      stubs: {
        RouterLink: true,
      },
      propsData: {
        project: project,
      },
    };
    const wrapper = shallowMount(ProjectNode, mountConfig);

    expect(wrapper.find(".project-item").exists()).toBe(true);
    expect(wrapper.find(".project-title h2").text()).toBe(
      project.project_title
    );
    if (project.project_start_date) {
      expect(wrapper.find(".project-start-date h3").text()).toContain(
        project.project_start_date.toLocaleDateString("en-GB")
      );
    }
    expect(wrapper.find(".project-summary p").text()).toBe(
      project.project_description
    );
  }); // Test case ends

  it("should call deleteProjectById when confirmDelete is called", async () => {
    const project: Project = {
      project_title: "My Project",
      project_description: "This is my project",
      project_content: "Project content goes here",
      project_id: 1,
      project_link: "https://example.com",
      project_start_date: new Date(),
    };

    // Mock window.confirm to return true
    const originalConfirm = window.confirm;
    window.confirm = jest.fn(() => true);

    const deleteProjectByIdMock = jest.spyOn(store, "dispatch");
    deleteProjectByIdMock.mockResolvedValueOnce(undefined);

    const mountConfig = {
      global: {
        plugins: [router, store],
      },
      stubs: {
        RouterLink: true,
      },
      propsData: {
        project: project,
      },
    };

    const wrapper = shallowMount(ProjectNode, mountConfig);

    await wrapper.vm.confirmDelete();

    expect(deleteProjectByIdMock).toHaveBeenCalledTimes(1);
    expect(deleteProjectByIdMock).toHaveBeenCalledWith(
      "deleteProjectById",
      project.project_id
    );

    // Restore window.confirm to its original implementation
    window.confirm = originalConfirm;
  });
});

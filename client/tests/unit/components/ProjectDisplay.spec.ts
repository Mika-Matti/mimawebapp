import { shallowMount } from "@vue/test-utils";
import { Project } from "@/types";
import ProjectDisplay from "@/components/ProjectDisplay.vue";

describe("ProjectDisplay-component", () => {
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
      propsData: {
        project: project,
      },
    };
    const wrapper = shallowMount(ProjectDisplay, mountConfig);

    expect(wrapper.find(".project").exists()).toBe(true);
    expect(wrapper.find(".project-page-title h2").text()).toBe(
      project.project_title
    );
    if (project.project_start_date) {
      expect(wrapper.find(".project-start-date h3").text()).toContain(
        project.project_start_date.toLocaleDateString("en-GB")
      );
    }
    expect(wrapper.find(".project-page-summary p").text()).toBe(
      project.project_description
    );
    expect(wrapper.find(".project-page-content").text()).toBe(
      project.project_content
    );
    expect(wrapper.find(".project-page-link a").attributes("href")).toBe(
      project.project_link
    );
  });
});

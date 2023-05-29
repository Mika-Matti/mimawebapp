import { ProjectsState, Project } from "@/types";

const state: ProjectsState = {
  projects: [] as Project[],
  project: null as Project | null,
};

export default state;

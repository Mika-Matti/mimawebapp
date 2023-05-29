// Object types
export interface Project {
  project_id?: number;
  project_title: string;
  project_description: string;
  project_content: string;
  project_link: string;
}

// Store state types
export interface RootState {
  projects: ProjectsState;
}

export interface ProjectsState {
  projects: Project[];
  project: Project | null;
}

// Object types
export interface DecodedToken {
  userId: number;
  username: string;
  role: string;
  exp: number;
}
export interface Project {
  project_id?: number;
  project_title: string;
  project_description: string;
  project_content: string;
  project_link: string;
}

export interface ObjectModel {
  fields: Array<{ name: string; label: string; type: string }>;
}

// Store state types
export interface RootState {
  projects: ProjectsState;
}

export interface ProjectsState {
  projects: Project[];
  project: Project | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  role: string;
  expiration: number;
}

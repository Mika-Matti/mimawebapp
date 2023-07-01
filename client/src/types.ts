// Object types
export interface DecodedToken {
  userId: number;
  username: string;
  role: string;
  exp: number;
}

export interface Project {
  project_title: string;
  project_description: string;
  project_content: string;
  project_id?: number;
  project_link?: string;
  project_start_date?: Date;
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

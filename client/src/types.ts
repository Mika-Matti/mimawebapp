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

export interface Post {
  post_title: string;
  post_content: string;
  post_date: Date;
  post_is_public: boolean;
  post_id?: number;
  user_id?: number;
}

export interface Filters {
  fromRow: number;
  limit: number;
}

// Store state types
export interface RootState {
  projects: ProjectsState;
  posts: PostsState;
  auth: AuthState;
}

export interface ProjectsState {
  projects: Project[];
  project: Project | null;
}

export interface PostsState {
  posts: Post[];
  post: Post | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  role: string;
  expiration: number;
}

const API_BASE_URL = process.env.VUE_APP_BASE_URL;

export const API_URLS = {
  projects: `${API_BASE_URL}/projects`,
  project: (id: string) => `${API_BASE_URL}/projects/${id}`,
  posts: (visibility: string) => `${API_BASE_URL}/posts/${visibility}`, // all or public
  post: (visibility: string, id: string) =>
    `${API_BASE_URL}/posts/${visibility}/${id}`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
};

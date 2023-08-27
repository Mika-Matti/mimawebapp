import sanitizeHtml from "sanitize-html";

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

export const sanitizedHtmlOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["iframe", "img"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    iframe: [
      "src",
      "width",
      "height",
      "frameborder",
      "allow",
      "allowfullscreen",
    ],
    img: ["src", "alt", "width", "height"],
  },
};

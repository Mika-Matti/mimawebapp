import { createStore } from "vuex";
import { RootState } from "@/types";
import projectsModule from "./modules/projects";
import postsModule from "./modules/posts";
import authModule from "./modules/auth";

export default createStore<RootState>({
  modules: {
    projects: projectsModule,
    posts: postsModule,
    auth: authModule,
  },
});

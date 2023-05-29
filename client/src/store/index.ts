import { createStore } from "vuex";
import { RootState } from "@/types";
import projectsModule from "./modules/projects";

export default createStore<RootState>({
  modules: {
    projects: projectsModule,
  },
});

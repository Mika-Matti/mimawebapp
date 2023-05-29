import { createStore } from "vuex";
import { RootState } from "@/types";
import projectsModule from "./projects";

export default createStore<RootState>({
  modules: {
    projects: projectsModule,
  },
});

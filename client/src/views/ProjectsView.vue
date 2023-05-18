<template>
  <div class="projects">
    <ProjectsPage pageHeader="/projects" :projects="projects" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import ProjectsPage from "@/components/ProjectsPage.vue";

@Options({
  components: {
    ProjectsPage,
  },
})
export default class ProjectsView extends Vue {
  projects = [];

  store = useStore();

  // Fetch projects from server
  async fetchProjects() {
    try {
      await this.store.dispatch("fetchProjects");
      this.projects = this.store.getters.getProjects;
    } catch (error) {
      console.error("Failed to fetch projecs", error);
    }
  }

  // Call fetch once component is mounted
  mounted() {
    this.fetchProjects();
  }
}
</script>

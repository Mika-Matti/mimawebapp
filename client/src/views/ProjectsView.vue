<template>
  <PageHeader />
  <ProjectsPage :projects="projects" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import PageHeader from "@/components/PageHeader.vue";
import ProjectsPage from "@/components/ProjectsPage.vue";

@Options({
  components: {
    PageHeader,
    ProjectsPage,
  },
})
export default class ProjectsView extends Vue {
  pageHeader = "/";
  projects = [];
  store = useStore();

  // Fetch projects from server
  async fetchProjects() {
    try {
      await this.store.dispatch("fetchProjects");
      this.projects = this.store.getters.getProjects;
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  }

  // Call fetch once component is mounted
  mounted() {
    this.fetchProjects();
  }
}
</script>

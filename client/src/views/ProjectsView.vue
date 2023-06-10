<template>
  <PageHeader />
  <AdminPanel>
    <template #buttons>
      <router-link class="project-link project-button" :to="`/projects/create`">
        new project
      </router-link>
    </template>
  </AdminPanel>
  <div class="projects">
    <ul>
      <li v-for="project in projects" :key="project.project_id">
        <ProjectNode :project="project" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { Project } from "@/types";
import PageHeader from "@/components/PageHeader.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import ProjectNode from "@/components/ProjectNode.vue";

@Options({
  components: {
    PageHeader,
    AdminPanel,
    ProjectNode,
  },
})
export default class ProjectsView extends Vue {
  pageHeader = "/";
  projects: Project[] = [];
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

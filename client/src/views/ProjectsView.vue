<template>
  <PageHeader />
  <AdminPanel>
    <template #buttons>
      <router-link class="button ms-0 my-0" :to="`/create/project`">
        new project
      </router-link>
    </template>
  </AdminPanel>
  <LoadingScreen :error="error" :display="display" />
  <div class="nodes">
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
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import LoadingScreen from "@/components/ui/LoadingScreen.vue";
import ProjectNode from "@/components/ProjectNode.vue";

@Options({
  components: {
    PageHeader,
    AdminPanel,
    LoadingScreen,
    ProjectNode,
  },
})
export default class ProjectsView extends Vue {
  pageHeader = "/";
  projects: Project[] = [];
  store = useStore();
  error = false;
  display = true;

  // Fetch projects from server
  async fetchProjects() {
    try {
      await this.store.dispatch("fetchProjects");
      this.projects = this.store.getters.getProjects;
      this.display = false;
    } catch (error) {
      this.error = true;
      //console.error("Failed to fetch projects", error);
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

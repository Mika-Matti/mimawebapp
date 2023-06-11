<template>
  <PageHeader />
  <AdminPanel>
    <template #buttons>
      <router-link class="button ms-0 my-0" :to="`/projects/edit`">
        edit project
      </router-link>
      <button class="button my-0" @click="confirmDelete">delete project</button>
    </template>
  </AdminPanel>
  <div class="project">
    <div class="project-page-title">
      <h2>{{ project.project_title }}</h2>
    </div>
    <div class="project-page-summary">
      <p>{{ project.project_description }}</p>
    </div>
    <div class="project-page-link">
      <p>
        <a :href="project.project_link" target="_blank" rel="noopener"
          >View project on Github
        </a>
      </p>
    </div>
    <div class="project-page-content" v-html="project.project_content" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { Project } from "@/types";
import PageHeader from "@/components/PageHeader.vue";
import AdminPanel from "@/components/AdminPanel.vue";

@Options({
  components: {
    PageHeader,
    AdminPanel,
  },
})
export default class ProjectView extends Vue {
  project_id = "-1";
  project: Project = {
    project_title: "",
    project_description: "",
    project_content: "",
    project_link: "",
  };
  store = useStore();

  // Fetch project by id from server
  async fetchProjectById(id: string) {
    try {
      await this.store.dispatch(`fetchProjectById`, id);
      this.project = this.store.getters.getProject;
    } catch (error) {
      console.error("Failed to fetch project by id", error);
    }
  }

  // Delete project methods
  confirmDelete() {
    if (
      confirm("Are you sure you want to delete this project from the database?")
    ) {
      this.deleteProjectById();
    }
  }

  async deleteProjectById() {
    try {
      await this.store.dispatch(`deleteProjectById`, this.project_id);
      // Redirect to projects page after deletion
      this.$router.push("/projects");
    } catch (error) {
      console.error("Failed to delete project by id", error);
    }
  }

  mounted() {
    this.project_id = this.$route.params.id[0];
    this.fetchProjectById(this.project_id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

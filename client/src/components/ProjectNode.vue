<template>
  <div class="project-item container-fluid mx-0 px-0">
    <div class="row mx-0 px-0">
      <div class="col mx-0 px-0">
        <div class="row mx-0 px-0 project-title">
          <h2>{{ project.project_title }}</h2>
        </div>
        <div class="row mx-0 px-0 project-summary">
          <p>{{ project.project_description }}</p>
        </div>
      </div>
      <div class="col-auto mx-0 px-0 d-flex flex-column justify-content-center">
        <AdminPanel>
          <template #buttons>
            <router-link
              class="button ms-0 my-0"
              :to="`/project/${project.project_id}/edit`"
            >
              edit
            </router-link>
            <button class="button me-0 my-0" @click="confirmDelete">
              delete
            </button>
          </template>
        </AdminPanel>
        <router-link
          class="project-link project-button"
          :to="`/projects/${project.project_id}`"
        >
          View Project
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { Project } from "@/types";
import AdminPanel from "@/components/AdminPanel.vue";

@Options({
  props: {
    project: {},
  },
  components: {
    AdminPanel,
  },
})
export default class ProjectNode extends Vue {
  project!: Project;
  store = useStore();

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
      await this.store.dispatch(`deleteProjectById`, this.project.project_id);
      // Redirect to projects page after deletion
      this.$router.push("/projects");
    } catch (error) {
      console.error("Failed to delete project by id", error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

<template>
  <div class="item-node container-fluid mx-0 px-0">
    <div class="row mx-0 px-0">
      <div class="col-sm mx-0 px-0">
        <div class="row mx-0 px-0 project-title">
          <h2>{{ project.project_title }}</h2>
        </div>
        <div
          v-if="project.project_start_date"
          class="row mx-0 px-0 project-start-date"
        >
          <h3>
            DATE STARTED:
            {{ project.project_start_date.toLocaleDateString("en-GB") }}
          </h3>
        </div>
        <div class="row mx-0 px-0 project-summary">
          <p>{{ project.project_description }}</p>
        </div>
      </div>
      <div
        class="col-sm-auto node-options mx-0 d-flex flex-column justify-content-center"
      >
        <AdminPanel>
          <template #buttons>
            <router-link
              class="col button ms-0 my-0"
              :to="`/edit/project/${project.project_id}`"
            >
              edit
            </router-link>
            <button class="col button me-0 my-0" @click="confirmDelete">
              delete
            </button>
          </template>
        </AdminPanel>
        <router-link
          class="node-link button mx-0"
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
import AdminPanel from "@/components/ui/AdminPanel.vue";

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
      //console.error("Failed to delete project by id", error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

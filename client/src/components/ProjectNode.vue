<template>
  <div class="project-item container-fluid mx-0 px-0">
    <div class="row mx-0 px-0">
      <div class="col-10 mx-0 px-0">
        <div class="row mx-0 px-0 project-title">
          <h2>{{ project.project_title }}</h2>
        </div>
        <div class="row mx-0 px-0 project-summary">
          <p>{{ project.project_description }}</p>
        </div>
      </div>
      <div
        class="col-2 mx-0 px-0 d-flex align-items-center justify-content-end"
      >
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
import { Project } from "@/types";

@Options({
  props: {
    project: {},
  },
})
export default class ProjectNode extends Vue {
  project!: Project;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

<template>
  <div class="project-item">
    <div class="project-info">
      <h2>{{ project.project_title }}</h2>
      <p>{{ project.project_description }}</p>
    </div>
    <div class="project-id">
      <p>Project ID: {{ project.project_id }}</p>
    </div>
  </div>
  <router-link :to="`/projects/${project.project_id}`" class="project-link">
    View Project
  </router-link>
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

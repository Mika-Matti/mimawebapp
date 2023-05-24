<template>
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
    <div class="project-page-content">
      {{ project.project_content }}
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
export default class ProjectPage extends Vue {
  project!: Project;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

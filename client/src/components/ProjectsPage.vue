<template>
  <div class="projects">
    <h1>{{ pageHeader }}</h1>
    <ul>
      <li v-for="project in projects" :key="project.project_id">
        {{ project.project_title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

interface Project {
  project_id?: number;
  project_title: string;
  project_description: string;
  project_content: string;
  project_link: string;
}

@Options({
  props: {
    pageHeader: String,
    projects: Array as () => Project[],
  },
})
export default class ProjectsPage extends Vue {
  pageHeader!: string;
  projects!: Project[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

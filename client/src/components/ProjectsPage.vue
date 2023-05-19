<template>
  <div class="projects">
    <h1>{{ pageHeader }}</h1>
    <ul>
      <li v-for="project in projects" :key="project.project_id">
        <ProjectNode :project="project" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Project } from "@/types";
import ProjectNode from "@/components/ProjectNode.vue";

@Options({
  components: {
    ProjectNode,
  },
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

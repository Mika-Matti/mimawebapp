<template>
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
import { Project } from "@/types";
import ProjectNode from "@/components/ProjectNode.vue";

@Options({
  components: {
    ProjectNode,
  },
  props: {
    projects: Array as () => Project[],
  },
})
export default class ProjectsPage extends Vue {
  projects!: Project[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

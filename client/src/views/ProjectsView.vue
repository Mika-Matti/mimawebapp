<template>
  <div class="projects">
    <ProjectsPage pageHeader="/projects" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProjectsPage from "@/components/ProjectsPage.vue";

@Options({
  components: {
    ProjectsPage,
  },
})
export default class ProjectsView extends Vue {}
</script>

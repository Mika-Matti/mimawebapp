<template>
  <div class="project">
    <PageHeader />
    <ProjectPage />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";
import ProjectPage from "@/components/ProjectPage.vue"; // @ is an alias to /src

@Options({
  components: {
    PageHeader,
    ProjectPage,
  },
})
export default class ProjectView extends Vue {
  project_id = "-1";
  project = {};

  mounted() {
    this.project_id = this.$route.params.id[0];
  }
}
</script>

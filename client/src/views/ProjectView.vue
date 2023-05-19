<template>
  <div class="project">
    <h1>{{ pageHeader }}</h1>
    TODO
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProjectPage from "@/components/ProjectPage.vue"; // @ is an alias to /src

export default class ProjectView extends Vue {
  pageHeader = "/";

  mounted() {
    this.pageHeader = this.$router.currentRoute.value.path;
  }
}
</script>

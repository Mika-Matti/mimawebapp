<template>
  <div class="project">TODO</div>
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

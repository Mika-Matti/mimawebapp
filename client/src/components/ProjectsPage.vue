<template>
  <div class="projects">
    <h1>{{ pageHeader }}</h1>
    <h3>Projects page under construction</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    pageHeader: String,
  },
})
export default class ProjectsPage extends Vue {
  pageHeader!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

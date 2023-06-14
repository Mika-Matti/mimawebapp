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
    <div class="project-page-content" v-html="project.project_content" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Project } from "@/types";

export default defineComponent({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

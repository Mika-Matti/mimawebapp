<template>
  <div v-if="project" class="project">
    <div class="project-page-title">
      <h2>{{ project.project_title }}</h2>
    </div>
    <div v-if="project.project_start_date" class="project-start-date">
      <h3>
        DATE STARTED:
        {{ project.project_start_date.toISOString().split("T")[0] }}
      </h3>
    </div>
    <div class="project-page-summary">
      <p>{{ project.project_description }}</p>
    </div>
    <div v-if="project.project_link" class="project-page-link">
      <p>
        <a :href="project.project_link" target="_blank" rel="noopener"
          >View project on Github
        </a>
      </p>
    </div>
    <div class="project-page-content" v-html="sanitizedContent" />
  </div>
  <div v-else>
    <!-- Handle the case when project is null -->
    <p>No project found.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Project } from "@/types";
import sanitizeHtml from "sanitize-html";

export default defineComponent({
  props: {
    project: {
      type: [Object, null] as PropType<Project | null>,
      required: true,
    },
  },
  computed: {
    sanitizedContent(): string {
      if (this.project) {
        return sanitizeHtml(this.project.project_content);
      }
      return "";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

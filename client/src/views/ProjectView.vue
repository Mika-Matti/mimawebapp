<template>
  <div class="project">
    <PageHeader />
    <ProjectPage :project="project" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
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
  store = useStore();

  // Fetch project by id from server
  async fetchProjectById(id: string) {
    try {
      await this.store.dispatch(`fetchProjectById`, id);
      this.project = this.store.getters.getProject;
    } catch (error) {
      console.error("Failed to fetch project by id", error);
    }
  }

  mounted() {
    this.project_id = this.$route.params.id[0];
    this.fetchProjectById(this.project_id);
  }
}
</script>

<template>
  <PageHeader />
  <AdminPanel v-if="project">
    <template #buttons>
      <router-link
        class="col button ms-0 my-0"
        :to="`/edit/project/${project_id}`"
      >
        edit project
      </router-link>
      <button class="col button my-0" @click="confirmDelete">
        delete project
      </button>
    </template>
  </AdminPanel>
  <LoadingScreen :error="error" :display="display" />
  <ProjectDisplay v-if="project" :project="project" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { Project } from "@/types";
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import LoadingScreen from "@/components/ui/LoadingScreen.vue";
import ProjectDisplay from "@/components/ProjectDisplay.vue";

export default defineComponent({
  components: {
    PageHeader,
    AdminPanel,
    LoadingScreen,
    ProjectDisplay,
  },
  data() {
    return {
      store: useStore(),
      error: false,
      display: true,
      project_id: "-1",
      project: null as Project | null,
    };
  },
  methods: {
    // Fetch project by id from server
    async fetchProjectById(id: string) {
      try {
        await this.store.dispatch(`fetchProjectById`, id);
        this.project = this.store.getters.getProject;
        this.display = false;
      } catch (error) {
        this.error = true;
        //console.error("Failed to fetch project by id", error);
      }
    },
    // Delete project methods
    confirmDelete() {
      if (
        confirm(
          "Are you sure you want to delete this project from the database?"
        )
      ) {
        this.deleteProjectById();
      }
    },
    async deleteProjectById() {
      try {
        await this.store.dispatch(`deleteProjectById`, this.project_id);
        // Redirect to projects page after deletion
        this.$router.push("/projects");
      } catch (error) {
        //console.error("Failed to delete project by id", error);
      }
    },
  },

  mounted() {
    this.project_id = this.$route.params.id.toString();
    this.fetchProjectById(this.project_id);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

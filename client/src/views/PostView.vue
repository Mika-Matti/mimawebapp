<template>
  <PageHeader />
  <AdminPanel v-if="post">
    <template #buttons>
      <router-link class="col button ms-0 my-0" :to="`/edit/post/${post_id}`">
        edit post
      </router-link>
      <button class="col button my-0 me-0" @click="confirmDelete">
        delete post
      </button>
    </template>
  </AdminPanel>
  <LoadingScreen :error="error" :display="display" />
  <PostDisplay v-if="post" :post="post" :showFullContent="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { Post } from "@/types";
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import LoadingScreen from "@/components/ui/LoadingScreen.vue";
import PostDisplay from "@/components/PostDisplay.vue";

export default defineComponent({
  components: {
    PageHeader,
    AdminPanel,
    LoadingScreen,
    PostDisplay,
  },
  data() {
    return {
      store: useStore(),
      error: false,
      display: true,
      post_id: "-1",
      post: null as Post | null,
    };
  },
  methods: {
    // Fetch post by id from server
    async fetchPostById(id: string) {
      try {
        await this.store.dispatch(`fetchPostById`, id);
        this.post = this.store.getters.getPost;
        this.display = false;
      } catch (error) {
        this.error = true;
        //console.error("Failed to fetch post by id", error);
      }
    },
    // Delete project methods
    confirmDelete() {
      if (
        confirm("Are you sure you want to delete this post from the database?")
      ) {
        this.deletePostById();
      }
    },
    async deletePostById() {
      try {
        await this.store.dispatch(`deletePostById`, this.post_id);
        // Redirect to posts page after deletion
        this.$router.push("/posts");
      } catch (error) {
        //console.error("Failed to delete post by id", error);
      }
    },
  },

  mounted() {
    this.post_id = this.$route.params.id.toString();
    this.fetchPostById(this.post_id);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

<template>
  <PageHeader />
  <AdminPanel>
    <template #buttons>
      <router-link class="button ms-0 my-0" :to="`/create/post`">
        new post
      </router-link>
    </template>
  </AdminPanel>
  <LoadingScreen :error="error" :display="display" />
  <div class="nodes">
    <ul>
      <li v-for="post in posts" :key="post.post_id">
        <PostNode :post="post" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { Post } from "@/types";
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import LoadingScreen from "@/components/ui/LoadingScreen.vue";
import PostNode from "@/components/PostNode.vue";

@Options({
  components: {
    PageHeader,
    AdminPanel,
    LoadingScreen,
    PostNode,
  },
})
export default class PostsView extends Vue {
  pageHeader = "/";
  posts: Post[] = [];
  store = useStore();
  error = false;
  display = true;

  // Fetch posts from server
  async fetchPosts() {
    try {
      await this.store.dispatch("fetchPosts");
      this.posts = this.store.getters.getPosts();
      this.display = false;
    } catch (error) {
      this.error = true;
      //console.error("Failed to fetch posts", error);
    }
  }

  // Call fetch once component is mounted
  mounted() {
    this.fetchPosts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

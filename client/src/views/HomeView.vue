<template>
  <PageHeader />
  <div class="home">
    <h2>Welcome to mimanet (Current version: 1.1)</h2>
    <div class="home-content">
      <p>
        Welcome to my website. The main purpose of this site is to showcase my
        portfolio as a software developer. I started building this site in 2023
        spring. I used node.js for server, mySQL for database and VUE for the
        client as well as typescript for general programming and Jest for unit
        testing. You can read more about this and other projects from the
        projects page.
      </p>
      <p>I hope you enjoy your stay.</p>
      <p>- Mika-Matti</p>
    </div>
  </div>
  <div class="nodes">
    <h2>Latest posts</h2>
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
import PostNode from "@/components/PostNode.vue";

@Options({
  components: {
    PageHeader,
    PostNode,
  },
})
export default class HomeView extends Vue {
  posts: Post[] = [];
  store = useStore();

  // Fetch latest posts from server
  async fetchPosts() {
    try {
      const filters = {
        fromRow: 0,
        limit: 2,
      };
      await this.store.dispatch("fetchPosts", filters);
      this.posts = this.store.getters.getPosts(2);
    } catch (error) {
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

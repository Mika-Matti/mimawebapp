<template>
  <div class="item-node container-fluid mx-0 px-0">
    <div class="row mx-0 px-0">
      <div class="col mx-0 px-0">
        <PostDisplay :post="post" class="row mx-0 px-0" />
      </div>
      <div class="col-auto mx-0 px-0 d-flex flex-column justify-content-center">
        <AdminPanel>
          <template #buttons>
            <router-link
              class="button ms-0 my-0"
              :to="`/edit/post/${post.post_id}`"
            >
              edit
            </router-link>
            <button class="button me-0 my-0" @click="confirmDelete">
              delete
            </button>
          </template>
        </AdminPanel>
        <router-link class="node-link button" :to="`/posts/${post.post_id}`">
          View Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { Post } from "@/types";
import PostDisplay from "@/components/PostDisplay.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";

@Options({
  props: {
    post: {},
  },
  components: {
    PostDisplay,
    AdminPanel,
  },
})
export default class PostNode extends Vue {
  post!: Post;
  store = useStore();

  // Delete post methods
  confirmDelete() {
    if (
      confirm("Are you sure you want to delete this post from the database?")
    ) {
      this.deletePostById();
    }
  }

  async deletePostById() {
    try {
      await this.store.dispatch(`deletePostById`, this.post.post_id);
      // Redirect to posts page after deletion
      this.$router.push("/posts");
    } catch (error) {
      //console.error("Failed to delete post by id", error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

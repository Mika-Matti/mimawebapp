<template>
  <div class="item-node container-fluid mx-0 px-0">
    <div class="row mx-0 px-0">
      <div class="col-sm mx-0 px-0">
        <PostDisplay
          :post="post"
          :showFullContent="showFullContent"
          class="row mx-0 px-0"
        />
      </div>
      <div
        class="col-sm-auto node-options mx-0 d-flex flex-column justify-content-center"
      >
        <AdminPanel>
          <template #buttons>
            <router-link
              class="col button ms-0 my-0"
              :to="`/edit/post/${post.post_id}`"
            >
              edit
            </router-link>
            <button class="col button me-0 my-0" @click="confirmDelete">
              delete
            </button>
          </template>
        </AdminPanel>
        <div class="d-flex flex-sm-column flex-row">
          <router-link
            class="col node-link button mx-sm-0 ms-0"
            :to="`/posts/${post.post_id}`"
          >
            Go To Post
          </router-link>
          <button
            class="col button mx-sm-0 me-0"
            v-if="post.post_content.length > maxLength"
            @click="toggleShowFullContent"
          >
            {{ showFullContent ? "Show Less" : "Show More" }}
          </button>
        </div>
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
  maxLength = 100;
  showFullContent = false;
  store = useStore();

  toggleShowFullContent() {
    this.showFullContent = !this.showFullContent;
  }

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

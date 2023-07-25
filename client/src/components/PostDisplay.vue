<template>
  <div v-if="post" class="post">
    <div v-if="post.post_is_public" class="post-page-title">
      <h2>{{ post.post_title }}</h2>
    </div>
    <div v-else class="post-page-title">
      <h2>{{ post.post_title }} (PRIVATE)</h2>
    </div>
    <div v-if="post.post_date" class="post-date">
      <h3>
        POSTED:
        {{ post.post_date.toLocaleDateString("en-GB") }}
      </h3>
    </div>
    <div class="post-page-content" v-html="sanitizedContent" />
  </div>
  <div v-else>
    <!-- Handle the case when post is null -->
    <p>No post found.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Post } from "@/types";
import sanitizeHtml from "sanitize-html";

export default defineComponent({
  props: {
    post: {
      type: [Object, null] as PropType<Post | null>,
      required: true,
    },
  },
  computed: {
    sanitizedContent(): string {
      if (this.post) {
        return sanitizeHtml(this.post.post_content);
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

<template>
  <div v-if="post" class="post">
    <div v-if="post.post_is_public" class="post-title">
      <h2>{{ post.post_title }}</h2>
    </div>
    <div v-else class="post-title">
      <h2>{{ post.post_title }} (PRIVATE)</h2>
    </div>
    <div v-if="post.post_date" class="post-date">
      <h3>
        {{ post.post_date.toLocaleString("en-GB") }}
      </h3>
    </div>
    <div class="post-content" v-html="sanitizedContent" />
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
    showFullContent: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    sanitizedContent(): string {
      if (this.post) {
        return this.showFullContent
          ? sanitizeHtml(this.post.post_content)
          : sanitizeHtml(this.post.post_content).slice(0, this.maxLength);
      }
      return "";
    },
    maxLength(): number {
      // Set your desired maximum length for truncated content here
      return 100;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

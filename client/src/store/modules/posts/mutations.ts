import { MutationTree } from "vuex";
import { PostsState, Post } from "@/types";

const mutations: MutationTree<PostsState> = {
  setPosts: (state: PostsState, posts: Post[]) => {
    state.posts = posts.map((post: Post) => {
      if (post.post_date) {
        post.post_date = new Date(post.post_date);
      }
      return post;
    });
  },
  setPost: (state: PostsState, post: Post) => {
    if (post.post_date) {
      post.post_date = new Date(post.post_date);
    }
    state.post = post;
  },
  addPost: (state: PostsState, post: Post) => {
    if (post.post_date) {
      post.post_date = new Date(post.post_date);
    }
    state.posts.push(post);
  },
  removePost: (state: PostsState, id: number) => {
    const index = state.posts.findIndex((post) => post.post_id === id);

    if (index !== -1) {
      state.posts.splice(index, 1);
    }

    if (state.post && state.post.post_id === id) {
      state.post = null;
    }
  },
};

export default mutations;

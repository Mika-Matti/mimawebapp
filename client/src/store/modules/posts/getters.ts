import { GetterTree } from "vuex";
import { PostsState, RootState } from "@/types";

const getters: GetterTree<PostsState, RootState> = {
  getPosts: (state) => (xLatestPosts?: number) => {
    if (xLatestPosts && xLatestPosts < state.posts.length) {
      return state.posts.slice(xLatestPosts); // Return only latest x amount of posts from posts
    } else {
      return state.posts;
    }
  },
  getPost: (state) => state.post,
};

export default getters;

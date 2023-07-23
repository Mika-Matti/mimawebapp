import { GetterTree } from "vuex";
import { PostsState, RootState } from "@/types";

const getters: GetterTree<PostsState, RootState> = {
  getPosts: (state) => state.posts,
  getPost: (state) => state.post,
};

export default getters;

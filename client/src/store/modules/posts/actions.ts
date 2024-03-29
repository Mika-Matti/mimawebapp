import axios from "axios";
import { API_URLS } from "@/config";
import { ActionContext } from "vuex";
import { RootState, PostsState, Post, Filters } from "@/types";

axios.defaults.withCredentials = true;

export default {
  // Fetch posts
  async fetchPosts(
    { commit, rootGetters }: ActionContext<PostsState, RootState>,
    filters?: Filters
  ) {
    const queryParams: Record<string, string | number | boolean> = {
      ...filters, // Spread the filters object to include any additional properties
    };

    const isAuthenticated = rootGetters.getIsAuthenticated;
    const visibility = isAuthenticated ? "all" : "public";
    const response = await axios.get(API_URLS.posts(visibility), {
      params: queryParams,
    });
    commit("setPosts", response.data);
  },
  // Fetch post by id
  async fetchPostById(
    { commit, state, rootGetters }: ActionContext<PostsState, RootState>,
    id: string
  ) {
    const existingPost = state.posts.find(
      (post) => String(post.post_id) === id
    );

    if (existingPost) {
      commit("setPost", existingPost);
    } else {
      const isAuthenticated = rootGetters.getIsAuthenticated;
      const visibility = isAuthenticated ? "all" : "public";
      const response = await axios.get(API_URLS.post(visibility, id));
      commit("setPost", response.data);
    }
  },
  // Create post
  async createPost(
    { commit }: ActionContext<PostsState, RootState>,
    post: Post
  ) {
    try {
      const response = await axios.post(API_URLS.posts("all"), post);
      commit("addPost", response.data);
    } catch (error) {
      //console.error("Error creating post:", error);
    }
  },
  // Edit post
  async editPost({ commit }: ActionContext<PostsState, RootState>, post: Post) {
    try {
      const id = post.post_id?.toString();
      if (id) {
        await axios.put(API_URLS.post("all", id), post);
        commit("setPost", post);
      }
    } catch (error) {
      //console.error("Error editing post:", error);
    }
  },
  // Delete post by id
  async deletePostById(
    { commit }: ActionContext<PostsState, RootState>,
    id: string
  ) {
    try {
      await axios.delete(API_URLS.post("all", id));
      commit("removePost", parseInt(id, 10));
    } catch (error) {
      //console.error("Error deleting post by id:", error);
    }
  },
};

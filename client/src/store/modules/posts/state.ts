import { PostsState, Post } from "@/types";

const state: PostsState = {
  posts: [] as Post[],
  post: null as Post | null,
};

export default state;

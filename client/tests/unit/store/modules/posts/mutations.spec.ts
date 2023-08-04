import { MutationTree } from "vuex";
import { PostsState, Post } from "@/types";
import mutations from "@/store/modules/posts/mutations";

describe("Posts store module removePost mutation", () => {
  it("should find the post from state posts and remove it", () => {
    // Prepare the state
    const state: PostsState = {
      posts: [
        {
          post_title: "Post C",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 3,
          user_id: 1,
        },
        {
          post_title: "Post B",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 2,
          user_id: 1,
        },
        {
          post_title: "Post A",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 1,
          user_id: 1,
        },
      ],
      post: {
        post_title: "Post B",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: new Date(),
        post_is_public: true,
        post_id: 2,
        user_id: 1,
      } as Post,
    };
    mutations.removePost(state, 2);

    expect(state.posts.findIndex((post) => post.post_id === 2)).toBe(-1);
    expect(state.post).toBe(null);
  });
});

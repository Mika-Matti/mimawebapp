import { GetterTree } from "vuex";
import getters from "@/store/modules/posts/getters";
import { PostsState, RootState } from "@/types";

describe("posts module getters", () => {
  it("should return posts from state", () => {
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
      post: null,
    };

    // Call the getter
    const result = getters.getPosts(state, null, {} as RootState, null)();

    // Assertions
    expect(result).toEqual(state.posts);
  }); // test case ends

  it("should return newest 2 posts from state", () => {
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
      post: null,
    };

    // Call the getter
    const result = getters.getPosts(state, null, {} as RootState, null)(2);

    // Assertions
    expect(result).toEqual(state.posts.slice(2));
  }); // test case ends

  it("should return post from state", () => {
    // Prepare the state
    const state: PostsState = {
      posts: [],
      post: {
        post_title: "Post A",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: new Date(),
        post_is_public: true,
        post_id: 1,
        user_id: 1,
      },
    };

    // Call the getter
    const result = getters.getPost(state, null, {} as RootState, null);

    // Assertions
    expect(result).toEqual(state.post);
  }); // test case ends
});

import axios from "axios";
import { PostsState, RootState } from "@/types";
import { API_URLS } from "@/config";
import actions from "@/store/modules/posts/actions";

// Mock axios.post function to avoid actual API requests
jest.mock("axios");

describe("Posts module fetchPosts action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should fetch posts and call commit setPosts if successful", async () => {
    const commit = jest.fn();
    const response = {
      status: 200,
      data: [
        {
          post_title: "Post C",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 3,
        },
        {
          post_title: "Post B",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 2,
        },
        {
          post_title: "Post A",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 1,
        },
      ],
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: false,
      },
    };

    // Call the action
    await actions.fetchPosts(context);

    //Assertions
    expect(axios.get).toHaveBeenCalledWith(API_URLS.posts("public"), {
      params: {},
    });
    expect(commit).toHaveBeenCalledWith("setPosts", response.data);
  }); // Test case ends

  it("should not commit if fetch request to server unsuccessful", async () => {
    const commit = jest.fn();
    // Create a mock error object
    const error = new Error("Failed to fetch posts");

    jest.spyOn(axios, "get").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.fetchPosts(context);

    //Assertions
    expect(axios.get).toHaveBeenCalledWith(API_URLS.posts("all"), {
      params: {},
    });
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

describe("Posts module fetchPostById action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should commit project from store module state if exists", async () => {
    const commit = jest.fn();
    const expectedPost = {
      post_title: "Post A",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
      post_id: 1,
    };

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [expectedPost],
        post: null,
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: false,
      },
    };

    // Call the action
    await actions.fetchPostById(context, "1");

    //Assertions
    expect(commit).toHaveBeenCalledWith("setPost", expectedPost);
    expect(axios.get).not.toHaveBeenCalled();
  }); // Test case ends

  it("should call request post from server when not available in store state", async () => {
    const commit = jest.fn();
    const response = {
      status: 200,
      data: {
        post_title: "Post A",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: new Date(),
        post_is_public: true,
        post_id: 1,
        user_id: 1,
      },
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: null,
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: false,
      },
    };

    // Call the action
    await actions.fetchPostById(context, "1");

    // Assertions
    expect(commit).toHaveBeenCalledWith("setPost", response.data);
    expect(axios.get).toHaveBeenCalledWith(API_URLS.post("public", "1"));
  }); // Test case ends

  it("should not commit when fetching post from server if request unsuccessful", async () => {
    const commit = jest.fn();
    const error = new Error("Failed to fetch post");
    jest.spyOn(axios, "get").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: null,
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: false,
      },
    };

    // Call the action
    await actions.fetchPostById(context, "1");

    // Assertions
    expect(commit).not.toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(API_URLS.post("public", "1"));
  });
});

describe("Posts module createPost action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should send created post to server and then add it to posts state", async () => {
    const commit = jest.fn();
    const post = {
      post_title: "Post A",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
    };

    const response = {
      status: 200,
      data: {
        post_title: "Post A",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: new Date(),
        post_is_public: true,
        post_id: 1,
        user_id: 1,
      },
    };

    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: null,
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.createPost(context, post);

    // Assertions
    expect(commit).toHaveBeenCalledWith("addPost", response.data);
    expect(axios.post).toHaveBeenCalledWith(API_URLS.posts("all"), post);
  }); // Test case ends

  it("should not commit if request to server is unsuccessful", async () => {
    const commit = jest.fn();
    const post = {
      post_title: "Post A",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
    };

    const error = new Error("Failed to create project");
    jest.spyOn(axios, "post").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: null,
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.createPost(context, post);

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.posts("all"), post);
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

describe("Post module editPost action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should send edited post to server and then set it to posts state", async () => {
    const commit = jest.fn();
    const post = {
      post_title: "Post A",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
      post_id: 1,
      user_id: 1,
    };

    const response = {
      status: 200,
      data: {
        post_title: "Post A",
        post_content: "Lorem ipsum dolor sit amet...",
        post_date: new Date(),
        post_is_public: true,
        post_id: 1,
        user_id: 1,
      },
    };

    jest.spyOn(axios, "put").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: {
          post_title: "Old Post A",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 1,
          user_id: 1,
        },
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.editPost(context, post);

    // Assertions
    expect(commit).toHaveBeenCalledWith("setPost", post);
    expect(axios.put).toHaveBeenCalledWith(API_URLS.post("all", "1"), post);
  }); // Test case ends

  it("should not commit if edit request to server is unsuccessful", async () => {
    const commit = jest.fn();
    const post = {
      post_title: "Post A",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
      post_id: 1,
      user_id: 1,
    };

    const error = new Error("Failed to edit project");
    jest.spyOn(axios, "put").mockRejectedValueOnce(error);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: {
          post_title: "Old Post A",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 1,
          user_id: 1,
        },
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.editPost(context, post);

    // Assertions
    expect(axios.put).toHaveBeenCalledWith(API_URLS.post("all", "1"), post);
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

describe("Posts module deletePostById action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should send delete post request to server and remove post from state", async () => {
    const commit = jest.fn();
    const response = {
      status: 204,
    };

    jest.spyOn(axios, "delete").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: {
          post_title: "Post A",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 1,
          user_id: 1,
        },
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.deletePostById(context, "1");

    // Assertions
    expect(commit).toHaveBeenCalledWith("removePost", 1);
    expect(axios.delete).toHaveBeenCalledWith(API_URLS.post("all", "1"));
  }); // Test case ends

  it("should not commit if delete request to server is unsuccessful", async () => {
    const commit = jest.fn();

    const error = new Error("Failed to delete post");
    jest.spyOn(axios, "delete").mockRejectedValueOnce(error);

    // Create a mock context
    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {
        posts: [],
        post: {
          post_title: "Post A",
          post_content: "Lorem ipsum dolor sit amet...",
          post_date: new Date(),
          post_is_public: true,
          post_id: 1,
          user_id: 1,
        },
      } as PostsState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {
        getIsAuthenticated: true,
      },
    };

    // Call the action
    await actions.deletePostById(context, "1");

    // Assertions
    expect(axios.delete).toHaveBeenCalledWith(API_URLS.post("all", "1"));
    expect(commit).not.toHaveBeenCalled();
  }); // Test case ends
});

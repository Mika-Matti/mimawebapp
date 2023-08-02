import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "@/router";
import PostView from "@/views/PostView.vue";
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import PostDisplay from "@/components/PostDisplay.vue";
import { Post } from "@/types";

describe("PostView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the view properly", () => {
    const store = createStore({
      getters: {
        getPost: () => {
          return {
            post_title: "Post B",
            post_content: "Lorem ipsum dolor sit amet...",
            post_date: new Date(),
            post_is_public: true,
            post_id: 2,
          } as Post;
        },
      },
      actions: {
        fetchPostById: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            params: {
              id: "2",
            },
          },
        },
      },
      stubs: {
        RouterLink: true,
      },
    };

    const wrapper = shallowMount(PostView, mountConfig);

    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(PostDisplay).exists()).toBe(true);
    expect(wrapper.findComponent(AdminPanel).exists()).toBe(true);
  }); // Test case ends

  it("should call deletePostById when confirmed", () => {
    const store = createStore({
      getters: {
        getPost: () => {
          return {
            post_title: "Post B",
            post_content: "Lorem ipsum dolor sit amet...",
            post_date: new Date(),
            post_is_public: true,
            post_id: 2,
          } as Post;
        },
      },
      actions: {
        deletePostById: jest.fn(),
        fetchPostById: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            params: {
              id: "2",
            },
          },
        },
      },
      stubs: {
        RouterLink: true,
      },
    };

    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockReturnValue(true);

    const deletePostByIdSpy = jest.spyOn(
      PostView.methods as any,
      "deletePostById"
    );
    const dispatchMock = jest.spyOn(store, "dispatch");

    const wrapper = shallowMount(PostView, mountConfig);

    wrapper.vm.confirmDelete();

    expect(deletePostByIdSpy).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith("deletePostById", "2");

    mockConfirm.mockRestore();
    deletePostByIdSpy.mockRestore();
    dispatchMock.mockRestore();
  }); // Test case ends

  it("should not call deletePostById when not confirmed", () => {
    const store = createStore({
      getters: {
        getPost: () => {
          return {
            post_title: "Post B",
            post_content: "Lorem ipsum dolor sit amet...",
            post_date: new Date(),
            post_is_public: true,
            post_id: 2,
          } as Post;
        },
      },
      actions: {
        deletePostById: jest.fn(),
        fetchPostById: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        mocks: {
          $route: {
            params: {
              id: "2",
            },
          },
        },
      },
      stubs: {
        RouterLink: true,
      },
    };
    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockReturnValue(false);

    const deletePostByIdSpy = jest.spyOn(
      PostView.methods as any,
      "deletePostById"
    );
    const dispatchMock = jest.spyOn(store, "dispatch");

    const wrapper = shallowMount(PostView, mountConfig);

    wrapper.vm.confirmDelete();

    expect(deletePostByIdSpy).not.toHaveBeenCalled();
    expect(dispatchMock).not.toHaveBeenCalledWith("deletePostById", "3");

    mockConfirm.mockRestore();
    deletePostByIdSpy.mockRestore();
    dispatchMock.mockRestore();
  }); // Test case ends
});

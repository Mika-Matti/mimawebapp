import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { Post } from "@/types";
import router from "@/router";
import PostsView from "@/views/PostsView.vue";
import PageHeader from "@/components/ui/PageHeader.vue";
import AdminPanel from "@/components/ui/AdminPanel.vue";
import PostNode from "@/components/PostNode.vue";

describe("PostsView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the view properly", async () => {
    const mockPosts: Post[] = [
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
    ];

    const store = createStore({
      state: {
        posts: mockPosts,
      },
      getters: {
        getPosts: (state) => () => state.posts,
      },
      actions: {
        fetchPosts: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store, router],
        stubs: {
          RouterLink: true,
        },
      },
    };

    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    const wrapper = shallowMount(PostsView, mountConfig);

    await wrapper.vm.$nextTick(); // Wait for component properties update

    await wrapper.vm.$forceUpdate(); // Update the view

    expect(mockDispatch).toHaveBeenCalledWith("fetchPosts");
    expect(wrapper.vm.posts.length).toBe(3);
    expect(wrapper.find(".nodes").exists()).toBe(true);
    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
    expect(wrapper.findComponent(AdminPanel).exists()).toBe(true);
    expect(wrapper.findAllComponents(PostNode).length).toBe(3);
  }); // Test case ends
});

import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import PageHeader from "@/components/ui/PageHeader.vue";
import { createStore } from "vuex";
import { Post } from "@/types";

describe("HomeView", () => {
  it("should render the view properly", () => {
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
    ];

    const store = createStore({
      state: {
        posts: mockPosts,
      },
      getters: {
        getPosts: (state) => state.posts,
        getIsAuthenticated: () => {
          return true;
        },
      },
      actions: {
        fetchPosts: jest.fn(),
      },
    });

    const mountConfig = {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: true,
        },
      },
    };

    const wrapper = shallowMount(HomeView, mountConfig);

    expect(wrapper.find(".home").exists()).toBe(true);
    expect(wrapper.findComponent(PageHeader).exists()).toBe(true);
  }); // Test case ends
});

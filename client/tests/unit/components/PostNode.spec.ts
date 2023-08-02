import { shallowMount } from "@vue/test-utils";
import { Post } from "@/types";
import PostNode from "@/components/PostNode.vue";
import PostDisplay from "@/components/PostDisplay.vue";
import store from "@/store";
import router from "@/router";

describe("PostNode-component", () => {
  it("should display the post information correctly from passed prop", () => {
    const post: Post = {
      post_title: "Post B",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
      post_id: 2,
    };

    const mountConfig = {
      global: {
        plugins: [router, store],
      },
      stubs: {
        RouterLink: true,
      },
      propsData: {
        post: post,
      },
    };
    const wrapper = shallowMount(PostNode, mountConfig);

    expect(wrapper.find(".item-node").exists()).toBe(true);
    expect(wrapper.findComponent(PostDisplay).exists()).toBe(true);
  }); // Test case ends

  it("should call deletePostById when confirmDelete is called", async () => {
    const post: Post = {
      post_title: "Post B",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
      post_id: 2,
    };

    // Mock window.confirm to return true
    const originalConfirm = window.confirm;
    window.confirm = jest.fn(() => true);

    const deletePostByIdMock = jest.spyOn(store, "dispatch");
    deletePostByIdMock.mockResolvedValueOnce(undefined);

    const mountConfig = {
      global: {
        plugins: [router, store],
      },
      stubs: {
        RouterLink: true,
      },
      propsData: {
        post: post,
      },
    };

    const wrapper = shallowMount(PostNode, mountConfig);

    await wrapper.vm.confirmDelete();

    expect(deletePostByIdMock).toHaveBeenCalledTimes(1);
    expect(deletePostByIdMock).toHaveBeenCalledWith(
      "deletePostById",
      post.post_id
    );

    // Restore window.confirm to its original implementation
    window.confirm = originalConfirm;
  });
});

import { shallowMount } from "@vue/test-utils";
import { Post } from "@/types";
import PostDisplay from "@/components/PostDisplay.vue";

describe("PostDisplay-component", () => {
  it("should display the post information correctly from passed prop", () => {
    const post: Post = {
      post_title: "Post B",
      post_content: "Lorem ipsum dolor sit amet...",
      post_date: new Date(),
      post_is_public: true,
      post_id: 2,
      user_id: 1,
    };

    const mountConfig = {
      propsData: {
        post: post,
        showFullContent: true,
      },
    };
    const wrapper = shallowMount(PostDisplay, mountConfig);

    expect(wrapper.find(".post").exists()).toBe(true);
    expect(wrapper.find(".post-title h2").text()).toBe(post.post_title);
    if (post.post_date) {
      expect(wrapper.find(".post-date h3").text()).toContain(
        post.post_date.toLocaleString("en-GB")
      );
    }
    expect(wrapper.find(".post-content").text()).toBe(post.post_content);
  });
});

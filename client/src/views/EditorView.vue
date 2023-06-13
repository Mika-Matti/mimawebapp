<template>
  <PageHeader />
  <div v-if="isAuthorized" class="editor">
    <form @submit.prevent="submit">
      <div v-for="(value, key) in item" :key="key" class="form-group">
        <label :for="key"> {{ key }}</label>
        <textarea
          v-if="isTextArea(key)"
          :id="key"
          v-model="item![key]"
          class="form-control"
        ></textarea>
        <input v-else :id="key" v-model="item![key]" class="form-control" />
      </div>
      <button type="submit" class="button mx-0 my-0">
        Save {{ objectType }}
      </button>
    </form>
  </div>
  <div v-else>Unauthorized access</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Project } from "@/types";
import PageHeader from "@/components/PageHeader.vue";

export default defineComponent({
  components: {
    PageHeader,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = ref(store.getters.getIsAuthenticated);
    const role = ref(store.getters.getRole);
    const isAuthorized = computed(
      () => isAuthenticated.value && role.value === "admin"
    );

    const route = useRoute();
    const param = route.params.object;
    const objectType = Array.isArray(param) ? param[0] : param;
    const item = ref<Project | null>(null);

    // Set up initial values based on object type edited
    switch (objectType) {
      case "project":
        item.value = {
          project_title: "",
          project_description: "",
          project_content: "",
          project_link: "",
        };
        break;
      // Add more object models here for the editor to support
      default:
        console.error("Invalid object type: ", objectType);
        break;
    }

    const isTextArea = (key: string): boolean => {
      const textareaFields = ["content", "description"];
      return textareaFields.some((word) => key.includes(word));
    };

    const submit = () => {
      //TODO project type defines the store dispatch store module type used
      //Word create or edit in params should define the type of store command
      if (item.value) {
        // null check
        console.log("TODO: submit_item-method missing");
        console.log(item.value);
      } else {
        console.log("Nothing to submit");
      }
    };

    watchEffect(() => {
      isAuthenticated.value = store.getters.getIsAuthenticated;
      role.value = store.getters.getRole;
    });

    return {
      isAuthorized,
      objectType,
      item,
      isTextArea,
      submit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

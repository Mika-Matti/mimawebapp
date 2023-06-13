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
import { defineComponent, ref, computed, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Project } from "@/types";
import PageHeader from "@/components/PageHeader.vue";

export default defineComponent({
  components: {
    PageHeader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isAuthenticated = ref(store.getters.getIsAuthenticated);
    const role = ref(store.getters.getRole);
    const isAuthorized = computed(
      () => isAuthenticated.value && role.value === "admin"
    );

    const params = route.params;
    const objectType = params.object.toString();
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

    const submit = async () => {
      //Check if creating a new object or editing old one
      const path = route.path.split("/");
      const object = objectType.charAt(0).toUpperCase() + objectType.slice(1);
      let action = "";
      if (path[1] === "create") {
        action = path[1];
      } else {
        action = "edit";
      }
      const dispatchCommand = action + object;

      if (item.value) {
        try {
          await store.dispatch(dispatchCommand, item.value);
          // Use router return to previous page after success
          router.go(-1);
        } catch (error) {
          console.error("Failed to " + action + " " + objectType, error);
        }
      } else {
        console.log("Nothing to submit");
      }
    };

    watchEffect(() => {
      isAuthenticated.value = store.getters.getIsAuthenticated;
      role.value = store.getters.getRole;
    });

    const fetchProjectById = async (id: string) => {
      try {
        await store.dispatch(`fetchProjectById`, id);
        item.value = store.getters.getProject;
      } catch (error) {
        console.error("Failed to fetch project by id", error);
      }
    };

    onMounted(() => {
      if (params.id && objectType === "project") {
        fetchProjectById(params.id.toString());
      }
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

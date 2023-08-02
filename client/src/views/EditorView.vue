<template>
  <PageHeader />
  <div v-if="isAuthorized" class="editor">
    <form @submit.prevent="submit" class="edit-form">
      <div v-for="(value, key) in item" :key="key" class="form-group">
        <label :for="key"> {{ key }}</label>
        <textarea
          v-if="keyType(key) === 'textarea'"
          rows="16"
          :id="key"
          v-model="item[key]"
          class="form-control"
          required
        ></textarea>
        <Datepicker
          v-else-if="keyType(key) === 'date' && objectType !== 'post'"
          :id="key"
          :modelValue="new Date(item[key])"
          @update:modelValue="item[key] = $event"
          inputFormat="dd/MM/yyyy"
          class="form-control"
        />
        <input
          v-else-if="keyType(key) === 'checkbox'"
          :id="key"
          type="checkbox"
          v-model="item[key]"
          true-value="yes"
          false-value="no"
          class="form-check-input"
        />
        <input
          v-else
          :id="key"
          :disabled="keyType(key) === 'id' || keyType(key) === 'date'"
          v-model="item[key]"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="button mx-0 my-0">
        Save {{ objectType }}
      </button>
    </form>
    <h2 class="mb-0">{{ objectType }} Preview</h2>
    <div class="preview">
      <ProjectDisplay
        v-if="objectType === 'project'"
        :project="(convertObject() as Project)"
      />
      <PostDisplay
        v-else-if="objectType === 'post'"
        :post="(convertObject() as Post)"
        :showFullContent="true"
      />
    </div>
  </div>
  <div v-else>Unauthorized access</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Datepicker from "vue3-datepicker";
import { Project, Post } from "@/types";
import PageHeader from "@/components/ui/PageHeader.vue";
import ProjectDisplay from "@/components/ProjectDisplay.vue";
import PostDisplay from "@/components/PostDisplay.vue";

export default defineComponent({
  components: {
    PageHeader,
    ProjectDisplay,
    PostDisplay,
    Datepicker,
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
    const item = ref<Record<string, string | number>>({});

    // Set up initial values based on object type edited
    switch (objectType) {
      case "project":
        item.value = {
          project_title: "",
          project_start_date: new Date().toLocaleDateString(),
          project_link: "",
          project_description: "",
          project_content: "",
        };
        break;
      case "post":
        item.value = {
          post_title: "",
          post_date: new Date().toLocaleDateString(),
          post_content: "",
          post_is_public: "no",
        };
        break;
      // Add more object models here for the editor to support
      default:
        //console.error("Invalid object type: ", objectType);
        break;
    }

    const convertObject = (): Project | Post | null => {
      switch (objectType) {
        case "project":
          return {
            project_title: item.value.project_title,
            project_description: item.value.project_description,
            project_content: item.value.project_content,
            project_link: item.value.project_link,
            project_start_date: new Date(item.value.project_start_date),
            project_id: params.id ? Number(params.id) : undefined,
          } as Project;
        case "post":
          return {
            post_title: item.value.post_title,
            post_content: item.value.post_content,
            post_date: new Date(item.value.post_date),
            post_is_public: item.value.post_is_public === "yes" ? true : false,
            post_id: params.id ? Number(params.id) : undefined,
            user_id: item.value.user_id
              ? Number(item.value.user_id)
              : undefined,
          } as Post;
        default:
          return null;
      }
    };

    const keyType = (key: string): string => {
      const textareaFields = ["_content", "_description"];
      if (textareaFields.some((word) => key.includes(word))) {
        return "textarea";
      } else if (key.includes("_date")) {
        return "date";
      } else if (key.includes("_id")) {
        return "id";
      } else if (key.includes("_is_")) {
        return "checkbox";
      }
      return "default";
    };

    const submit = async () => {
      //Check if creating a new object or editing old one
      const path = route.path.split("/");
      const object = objectType.charAt(0).toUpperCase() + objectType.slice(1);
      let action = path[1]; //path format is /edit/:object/:id or /create/:object

      const dispatchCommand = action + object;

      if (item.value) {
        try {
          await store.dispatch(dispatchCommand, convertObject());
          // Use router return to previous page after success
          router.go(-1);
        } catch (error) {
          //console.error("Failed to " + action + " " + objectType, error);
        }
      } else {
        //console.log("Nothing to submit");
      }
    };

    watchEffect(() => {
      isAuthenticated.value = store.getters.getIsAuthenticated;
      role.value = store.getters.getRole;
    });

    const fetchObjectById = async (id: string) => {
      try {
        const object = objectType.charAt(0).toUpperCase() + objectType.slice(1);
        const command = "fetch" + object + "ById";

        switch (objectType) {
          case "project":
            await store.dispatch(command, id);
            item.value = store.getters.getProject;
            break;
          case "post":
            await store.dispatch(command, id);
            item.value = store.getters.getPost;
            if (store.getters.getPost.post_is_public) {
              item.value.post_is_public = "yes";
            } else {
              item.value.post_is_public = "no";
            }
            break;
          default:
            //console.error("Invalid object type: ", objectType);
            break;
        }
      } catch (error) {
        //console.error("Failed to fetch project by id", error);
      }
    };

    onMounted(() => {
      if (params.id) {
        fetchObjectById(params.id.toString());
      }
    });

    return {
      isAuthorized,
      objectType,
      item,
      convertObject,
      keyType,
      submit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

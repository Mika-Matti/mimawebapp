<template>
  <PageHeader />
  <div v-if="isAuthorized" class="editor">
    <form @submit.prevent="submit" class="edit-form">
      <div v-for="(value, key) in item" :key="key" class="form-group">
        <label :for="key"> {{ key }}</label>
        <textarea
          v-if="keyType(key) === 'textarea'"
          :id="key"
          v-model="item[key]"
          class="form-control"
          required
        ></textarea>
        <Datepicker
          v-else-if="keyType(key) === 'date'"
          :id="key"
          :model-value="new Date(item[key])"
          @update:modelValue="item[key] = $event"
          class="form-control"
        />
        <input
          v-else
          :id="key"
          :disabled="keyType(key) === 'id'"
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
        :project="convertObject()"
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
import { Project } from "@/types";
import PageHeader from "@/components/PageHeader.vue";
import ProjectDisplay from "@/components/ProjectDisplay.vue";

export default defineComponent({
  components: {
    PageHeader,
    ProjectDisplay,
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
          project_description: "",
          project_content: "",
          project_link: "",
          project_start_date: new Date().toLocaleDateString("en-GB"),
        };
        break;
      // Add more object models here for the editor to support
      default:
        //console.error("Invalid object type: ", objectType);
        break;
    }

    const convertObject = (): Project | null => {
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

    const fetchProjectById = async (id: string) => {
      try {
        await store.dispatch(`fetchProjectById`, id);
        item.value = store.getters.getProject;
      } catch (error) {
        //console.error("Failed to fetch project by id", error);
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

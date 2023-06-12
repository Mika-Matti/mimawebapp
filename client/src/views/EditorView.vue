<template>
  <PageHeader />
  <div v-if="isAuthorized" class="editor">
    <form @submit.prevent="submit">
      <div v-for="field in model.fields" :key="field.name" class="form-group">
        <label :for="field.name">{{ field.label }}</label>
        <textarea
          v-if="field.type === 'textarea'"
          :id="field.name"
          class="form-control"
          v-model="formData[field.name]"
        ></textarea>
        <input
          v-else
          :type="field.type"
          :id="field.name"
          class="form-control"
          v-model="formData[field.name]"
        />
      </div>
      <button type="submit" class="button mx-0 my-0">
        Save {{ objectType }}
      </button>
    </form>
  </div>
  <div v-else>Unauthorized access</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ObjectModel, Project } from "@/types";
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
    const formData: { [key: string]: string } = reactive({});

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
      // Add more objects here for the editor to support
      default:
        console.error("Invalid object type: ", objectType);
        break;
    }

    const objectModels: Record<string, ObjectModel> = {
      project: {
        fields: [],
      },
      // Add more object models for the editor to support
    };

    const textareaFields = ["content", "description"];
    const model: ObjectModel = objectModels[objectType];

    if (item.value) {
      model.fields = Object.keys(item.value).map((key) => ({
        name: key,
        label: key,
        type: textareaFields.some((word) => key.includes(word))
          ? "textarea"
          : "text",
      }));
    }

    const submit = () => {
      console.log("TODO: submit formData method missing");
      console.log(formData);
    };

    watchEffect(() => {
      isAuthenticated.value = store.getters.getIsAuthenticated;
      role.value = store.getters.getRole;
    });

    return {
      isAuthorized,
      objectType,
      model,
      formData,
      submit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

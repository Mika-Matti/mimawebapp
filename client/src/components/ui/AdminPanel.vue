<template>
  <div v-if="isAuthorized" class="container-fluid mx-0 px-0 admin-panel">
    <div class="row mx-0 px-0 my-0 view-options">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isAuthorized = ref(false);

    watchEffect(() => {
      const isAuthenticated = store.getters.getIsAuthenticated;
      const role = store.getters.getRole;
      isAuthorized.value = isAuthenticated && role === "admin";
    });

    return {
      isAuthorized,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/components.scss";
</style>

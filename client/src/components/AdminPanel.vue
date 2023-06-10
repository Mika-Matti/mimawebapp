<template>
  <div v-if="isAuthorized" class="admin-panel">
    <div class="view-options">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isAuthenticated = ref(store.getters.getIsAuthenticated);
    const role = ref(store.getters.getRole);
    const isAuthorized = computed(
      () => isAuthenticated.value && role.value === "admin"
    );

    return {
      isAuthorized,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

<template>
  <div v-if="isAuthenticated" class="user-header">You are logged in</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => {
      return store.getters.getIsAuthenticated;
    });

    return {
      isAuthenticated,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

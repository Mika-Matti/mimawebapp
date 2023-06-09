<template>
  <div class="user-header">
    <div v-if="isAuthenticated" class="user-items">
      <div class="user-item">Username</div>
      <div class="user-item">Role</div>
      <div class="user-item">Session time</div>
      <button @click="logout" class="button mx-0 my-0">Logout</button>
    </div>
    <div v-if="displayMessage">{{ displayMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const displayMessage = ref<string | null>(null);

    const isAuthenticated = computed(() => {
      return store.getters.getIsAuthenticated;
    });

    const logout = async () => {
      try {
        const errorMessage: string | null = await store.dispatch(`logout`);
        if (errorMessage) {
          displayMessage.value = errorMessage;
        } else {
          displayMessage.value = "You are no longer logged in";
          resetDisplayMessage();
        }
      } catch (error) {
        console.log("An error occurred during logout");
      }
    };

    const resetDisplayMessage = () => {
      setTimeout(() => {
        displayMessage.value = null;
      }, 10000); // Reset the value after 10 seconds
    };

    return {
      displayMessage,
      isAuthenticated,
      logout,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

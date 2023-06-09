<template>
  <div class="user-header">
    <div v-if="isAuthenticatedRef" class="user-items">
      <div class="user-item">Username: {{ username }}</div>
      <div class="user-item">User role: {{ role }}</div>
      <div class="user-item">time left: {{ sessionTime }} min</div>
      <button @click="logout" class="button mx-0 my-0">Logout</button>
    </div>
    <div v-if="displayMessage" class="user-message">{{ displayMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const displayMessage = ref<string | null>(null);
    const isAuthenticatedRef = ref<boolean>(false);

    const username = computed(() => {
      return store.getters.getUsername;
    });

    const role = computed(() => {
      return store.getters.getRole;
    });

    const sessionTime = computed(() => {
      return getSessionTimeLeft(store.getters.getExpiration);
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

    const getSessionTimeLeft = (exp: number) => {
      const expirationTime = exp * 1000; // Convert from seconds to milliseconds
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;
      return Math.ceil(timeLeft / 60000); // Convert milliseconds to minutes
    };

    watch(
      () => store.getters.getIsAuthenticated,
      (isAuthenticated) => {
        isAuthenticatedRef.value = isAuthenticated;
      }
    );

    return {
      displayMessage,
      isAuthenticatedRef,
      username,
      role,
      sessionTime,
      logout,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

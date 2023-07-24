<template>
  <div class="user-panel">
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
import { defineComponent, ref, watchEffect, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const displayMessage = ref<string | null>(null);
    const isAuthenticatedRef = ref<boolean>(false);
    const username = ref<string>("");
    const role = ref<string>("");
    const sessionTime = ref<number>(0);
    let timer: number | null = null;

    const updateSessionTime = () => {
      const expiration = store.getters.getExpiration;
      sessionTime.value = getSessionTimeLeft(expiration);

      if (sessionTime.value <= 0) {
        logout();
      }
    };

    const startTimer = () => {
      timer = setInterval(updateSessionTime, 60000); // Start the timer
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer); // Stop the timer
        timer = null; // Reset the timer variable
      }
    };

    const getSessionTimeLeft = (exp: number) => {
      if (exp <= 0) {
        return 0;
      }
      const expirationTime = exp * 1000; // Convert from seconds to milliseconds
      const currentTime = Date.now();
      const timeLeft = expirationTime - currentTime;
      return Math.ceil(timeLeft / 60000); // Convert milliseconds to minutes
    };

    const resetDisplayMessage = () => {
      setTimeout(() => {
        displayMessage.value = null;
      }, 5000); // Reset the value after 5 seconds
    };

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
        //console.log("An error occurred.");
      }
    };

    watchEffect(() => {
      isAuthenticatedRef.value = store.getters.getIsAuthenticated;
      username.value = store.getters.getUsername;
      role.value = store.getters.getRole;
      sessionTime.value = getSessionTimeLeft(store.getters.getExpiration);

      // Only have the session timer running if user is logged in
      if (isAuthenticatedRef.value) {
        startTimer();
      } else {
        stopTimer();
      }
    });

    onBeforeUnmount(() => {
      stopTimer();
    });

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
@import "../../assets/scss/components.scss";
</style>

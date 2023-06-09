<template>
  <div class="login-form">
    <!-- Show login form if not authenticated -->
    <div v-if="!isAuthenticated">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="userName"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="passWord"
            required
          />
        </div>
        <button type="submit" class="button mx-0 my-0">enter</button>
      </form>
      <div v-if="displayError" class="text-error">
        {{ displayError }}
      </div>
    </div>
    <!-- Otherwise show welcome message and logout button -->
    <div v-else>
      <div class="login-welcome">
        <div class="text-loggedin"><h2>You are logged in</h2></div>
        <p>Welcome, {{ userName }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
  data() {
    return {
      userName: this.$store.getters.getUsername,
      passWord: "",
      displayError: null as string | null,
      isAuthenticated: this.$store.getters.getIsAuthenticated,
    };
  },

  mounted() {
    watch(
      () => this.$store.getters.getIsAuthenticated,
      (value) => {
        this.isAuthenticated = value;
      }
    );
  },
  methods: {
    async login() {
      try {
        const errorMessage: string | null = await this.$store.dispatch(
          `login`,
          {
            username: this.userName,
            password: this.passWord,
          }
        );

        if (errorMessage) {
          this.displayError = errorMessage;
        } else {
          this.displayError = null;
          this.passWord = "";
        }
      } catch (error: unknown) {
        this.displayError = "An error occurred during login";
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

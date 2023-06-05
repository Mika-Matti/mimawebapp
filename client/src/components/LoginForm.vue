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
        <div class="text-loggedin">
          Session time left: {{ sessionTime }} minutes
        </div>
        <button @click="logout" class="button mx-0 my-0">Logout</button>
        <div v-if="displayError" class="text-error">
          {{ displayError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from "vuex";

export default class LoginForm extends Vue {
  userName = "";
  passWord = "";
  isAuthenticated = false;
  displayError: string | null = null;
  sessionTime: number | null = null;
  store = useStore();

  mounted() {
    this.isAuthenticated = this.store.getters.getIsAuthenticated;
    if (this.isAuthenticated) {
      this.userName = this.store.getters.getUsername;
      this.sessionTime = this.getSessionTimeLeft(
        this.store.getters.getExpiration
      );
    }
  }

  async login() {
    try {
      const errorMessage: string | null = await this.store.dispatch(`login`, {
        username: this.userName,
        password: this.passWord,
      });

      if (errorMessage) {
        this.displayError = errorMessage;
      } else {
        this.isAuthenticated = this.store.getters.getIsAuthenticated;
        this.sessionTime = this.getSessionTimeLeft(
          this.store.getters.getExpiration
        );
        this.displayError = null;
      }
    } catch (error: unknown) {
      this.displayError = "An error occurred during login";
    }
  }

  async logout() {
    try {
      const errorMessage: string | null = await this.store.dispatch(`logout`);

      if (errorMessage) {
        this.displayError = errorMessage;
      } else {
        this.userName = "";
        this.passWord = "";
        this.isAuthenticated = this.store.getters.getIsAuthenticated;
        this.displayError = null;
      }
    } catch (error: unknown) {
      this.displayError = "An error occurred during logout";
    }
  }

  getSessionTimeLeft(exp: number) {
    const expirationTime = exp * 1000; // Convert from seconds to milliseconds
    const currentTime = Date.now();
    const timeLeft = expirationTime - currentTime;
    return Math.ceil(timeLeft / 60000); // Convert milliseconds to minutes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

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
        <div class="text-loggedin"><h2>Success</h2></div>
        <p>Welcome, {{ userName }}</p>
        <button @click="logout" class="button mx-0 my-0">Logout</button>
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
  store = useStore();

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
      }
    } catch (error: unknown) {
      this.displayError = "An error occurred during login";
    }
  }

  logout() {
    console.log("clicked logout");
    //TODO use store action to send logout request to server.
    //If successful, do the following actions:
    //this.store.commit("setIsAuthenticated", false); //Do this in actions.ts
    //this.store.commit("setToken", null); //Do this in actions.ts
    //this.userName = "";
    //this.passWord = "";
    //this.loginError = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

<template>
  <div class="login-form">
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
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from "vuex";

export default class LoginForm extends Vue {
  userName = "";
  passWord = "";
  store = useStore();

  login() {
    this.store.dispatch(`login`, {
      username: this.userName,
      password: this.passWord,
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

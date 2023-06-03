<template>
  <div class="admin">
    <h2>Welcome to the secret page</h2>
    <div class="row mx-0 px-0">
      <div class="col-sm-6 text-container">
        <p>
          This is a secret page for admin stuff. If you have the credentials,
          then go right ahead. If you don't have credentials, this page isn't
          very useful for you.
        </p>
        <div class="image-container">
          <img
            class="image"
            src="@/assets/images/adminlock128.png"
            alt="Image of a lock"
          />
          <p class="image-caption">I sure hope this system is secure.</p>
        </div>
      </div>
      <div class="col-sm-6 px-0 login-container d-flex justify-content-end">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm from "@/components/LoginForm.vue";

@Options({
  components: {
    LoginForm,
  },
})
export default class AdminPage extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

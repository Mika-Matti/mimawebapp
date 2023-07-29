<template>
  <AppHeader />
  <nav class="container-fluid mx-0">
    <div class="row mx-0 px-0">
      <router-link class="router-link col" to="/">Home</router-link>
      <router-link class="router-link col" to="/posts">Posts</router-link>
      <router-link class="router-link col" to="/projects">Projects</router-link>
      <router-link class="router-link col" to="/about">About</router-link>
    </div>
  </nav>
  <div class="content">
    <router-view />
  </div>
  <AppFooter />
</template>

<script lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>

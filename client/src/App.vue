<template>
  <nav class="container-fluid">
    <div class="row">
      <router-link class="router-link col" to="/">Home</router-link>
      <router-link class="router-link col" to="/projects"
        >Portfolio</router-link
      >
      <router-link class="router-link col" to="/about">About</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>

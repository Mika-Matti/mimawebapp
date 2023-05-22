<template>
  <div class="header">
    <img alt="mimanet logo" src="./assets/images/mimanetlogo128.png" />
  </div>
  <nav class="container-fluid mx-0">
    <div class="row mx-0 px-0">
      <router-link class="router-link col" to="/">Home</router-link>
      <router-link class="router-link col" to="/projects">Projects</router-link>
      <router-link class="router-link col" to="/about">About</router-link>
    </div>
  </nav>
  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>

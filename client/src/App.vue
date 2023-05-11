<template>
  <nav>
    <router-link class="router-link" to="/">Home</router-link>
    <router-link class="router-link" to="/projects">Portfolio</router-link>
    <router-link class="router-link" to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
</style>

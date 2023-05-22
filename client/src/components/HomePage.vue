<template>
  <div class="home">
    <h3>Welcome to my website</h3>
    <p>
      This is my little project website with primary purpose to showcase my
      projects portfolio. For the website itself I used node.js for server,
      mySQL for database and VUE for the client as well as typescript for
      general programming and jest for unit testing.
    </p>
    <p>I hope you enjoy your stay.</p>
    <p>-Mika-Matti</p>
    <h3>Some essential links</h3>
    <ul>
      <li>
        <a href="https://github.com/Mika-Matti" target="_blank" rel="noopener"
          >Github</a
        >
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/mika-matti/"
          target="_blank"
          rel="noopener"
          >LinkedIn</a
        >
      </li>
      <li>
        <a href="mailto:mimanetmail@gmail.com" target="_blank" rel="noopener"
          >mimanetmail@gmail.com</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class HomePage extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

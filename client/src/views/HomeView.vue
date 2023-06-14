<template>
  <PageHeader />
  <div class="home">
    <h3>Welcome to my website (Current version: 1.0)</h3>
    <p>
      This is my little project website with primary purpose to showcase my
      projects portfolio. For the website itself I used node.js for server,
      mySQL for database and VUE for the client as well as typescript for
      general programming and jest for unit testing.
    </p>

    <p>
      As this website is very much a learning experience for me when it comes to
      using VUE, you will probably notice little things like changes in how I
      define components when you look at the code for the website on my Github.
      As much as I appreciate having a set way to do certain things, I tried to
      evolve along with what I learned during the development and change the
      ways I used VUE components in the client, hopefully finding a style that
      eventually becomes solid.
    </p>
    <p>I hope you enjoy your stay.</p>
    <p>- Mika-Matti</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";

@Options({
  components: {
    PageHeader,
  },
})
export default class HomeView extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

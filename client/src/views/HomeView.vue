<template>
  <PageHeader />
  <div class="home">
    <h3>Welcome to my website (Current version: 1.0)</h3>
    <p>
      This is my little project, that I started building in the spring of 2023.
      I used node.js for server, mySQL for database and VUE for the client as
      well as typescript for general programming and Jest for unit testing.
    </p>

    <h3>What's mimanet 1.0 for?</h3>
    <p>
      The main purpose of this site is to showcase my work as a software
      developer. The current content of this website can be summarized as
      follows:
    </p>
    <ul>
      <li>Home - This page you are currently reading</li>
      <li>
        Projects - The portfolio page, with all my public projects explained and
        their github repositories linked.
      </li>
      <li>About - General summary about who I am and what I do.</li>
    </ul>

    <h3>What's coming in future updates?</h3>
    <p>
      I have some features in mind, that I want to add to the website in future,
      but didn't feel the urge to rush them to the current release. Here's a few
      to mention:
    </p>
    <ul>
      <li>
        New page for posts to keep a blog about whatever day to day thoughts I
        feel like sharing, perhaps linking the latest post as a sort of news
        section on the homepage.
      </li>
      <li>Pagination for projects and posts</li>
      <li>
        Fetch currently static content dynamically from database. This is more
        of a quality of life thing for myself so updating home- and aboutpage
        would be more convenient.
      </li>
      <li>Tags to add to projects and possibly posts</li>
      <li>Filter options to sort projects and posts with</li>
    </ul>

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

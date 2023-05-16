<template>
  <div class="about">
    <AboutPage pageHeader="/about" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AboutPage from "@/components/AboutPage.vue"; // @ is an alias to /src

@Options({
  components: {
    AboutPage,
  },
})
export default class AboutView extends Vue {}
</script>

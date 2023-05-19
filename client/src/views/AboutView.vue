<template>
  <div class="about">
    <AboutPage :pageHeader="pageHeader" />
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
export default class AboutView extends Vue {
  pageHeader = "/";

  mounted() {
    this.pageHeader = this.$router.currentRoute.value.path;
  }
}
</script>

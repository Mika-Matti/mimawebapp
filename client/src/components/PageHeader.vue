<template>
  <div class="pageheader">
    <h1>{{ pageHeader }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class PageHeader extends Vue {
  pageHeader = "~";

  mounted() {
    this.pageHeader = this.$router.currentRoute.value.path;
    if (this.pageHeader == "/") {
      this.pageHeader = "/HOME";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

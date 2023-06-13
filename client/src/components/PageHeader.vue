<template>
  <div class="pageheader">
    <div class="row mx-0 px-0">
      <div class="col mx-0 px-0">
        <h1>{{ pageHeader }}</h1>
      </div>
      <div class="col-auto mx-0 px-0">
        <button
          v-if="showReturnButton"
          class="button mx-0 my-0"
          @click="goToPreviousPage"
        >
          Return
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class PageHeader extends Vue {
  pageHeader = "~";
  pageTitle = "mimanet -";
  showReturnButton = false;

  mounted() {
    this.pageHeader = this.$router.currentRoute.value.path;
    if (this.pageHeader == "/") {
      this.pageHeader = "/home";
    }

    this.showReturnButton = this.calculateShowReturnButton();
    this.setPageTitle();
  }

  calculateShowReturnButton() {
    const slashCount: number = (this.pageHeader.match(/\//g) || []).length;
    return slashCount > 1;
  }

  goToPreviousPage() {
    this.$router.go(-1);
  }

  setPageTitle() {
    document.title = this.pageTitle + this.pageHeader.replaceAll("/", " ");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

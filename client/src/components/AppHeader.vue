<template>
  <div class="app-header">
    <div class="container-fluid">
      <div class="row px-0">
        <div class="col px-0"></div>
        <div class="col px-0">
          <img alt="mimanet logo" src="@/assets/images/mimanetlogo128.png" />
        </div>
        <div class="col px-0">
          <UserHeader />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserHeader from "@/components/UserHeader.vue";

@Options({
  components: {
    UserHeader,
  },
})
export default class AppHeader extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

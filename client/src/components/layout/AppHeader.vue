<template>
  <div class="app-header">
    <div class="container-fluid">
      <div class="row px-0">
        <div class="col px-0"></div>
        <div class="col px-0">
          <router-link :to="`/`">
            <img alt="mimanet logo" src="@/assets/images/mimanetlogo128.png" />
          </router-link>
        </div>
        <div class="col px-0">
          <UserPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserPanel from "@/components/ui/UserPanel.vue";

@Options({
  components: {
    UserPanel,
  },
})
export default class AppHeader extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/components.scss";
</style>

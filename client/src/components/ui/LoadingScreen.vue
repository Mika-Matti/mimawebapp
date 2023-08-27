<template>
  <div v-if="display">
    <div v-if="!error" class="text-center">
      <div class="image-container">
        <img
          class="image"
          src="@/assets/images/loadinganimation128.gif"
          alt="Loading animation for retrieving items"
        />
        <p class="image-caption">Retrieving data from server.</p>
      </div>
    </div>
    <div v-else class="text-center">
      <div class="image-container">
        <img
          class="image"
          src="@/assets/images/404notfound128.png"
          alt="Loading animation for retrieving items"
        />
        <p class="image-caption">Error: Could not retrieve data from server</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    display: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/components.scss";
</style>

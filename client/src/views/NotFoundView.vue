<template>
  <PageHeader />
  <div class="not-found">
    <h2>Page not found</h2>
    <p>
      Oops, looks like something went wrong and you ended up here. Either the
      page you were looking for doesn't exist or you are not authorized to view
      it.
    </p>
    <div class="image-container">
      <img
        class="image"
        src="@/assets/images/404notfound128.png"
        alt="Image of someone lost in the internet"
      />
      <p class="image-caption">How unfortunate.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "@/components/ui/PageHeader.vue";

export default defineComponent({
  components: {
    PageHeader,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

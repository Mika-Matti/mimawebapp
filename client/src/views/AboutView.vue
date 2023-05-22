<template>
  <PageHeader />
  <AboutPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";
import AboutPage from "@/components/AboutPage.vue"; // @ is an alias to /src

@Options({
  components: {
    PageHeader,
    AboutPage,
  },
})
export default class AboutView extends Vue {}
</script>

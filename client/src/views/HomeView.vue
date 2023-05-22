<template>
  <PageHeader />
  <HomePage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";
import HomePage from "@/components/HomePage.vue"; // @ is an alias to /src

@Options({
  components: {
    PageHeader,
    HomePage,
  },
})
export default class HomeView extends Vue {}
</script>

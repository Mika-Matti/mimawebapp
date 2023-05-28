<template>
  <PageHeader />
  <AdminPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";
import AdminPage from "@/components/AdminPage.vue";

@Options({
  components: {
    PageHeader,
    AdminPage,
  },
})
export default class AdminView extends Vue {}
</script>

<template>
  <PageHeader />
  <div class="about">
    <div class="about-content">
      <div class="text">
        <h3>Some things about me</h3>
        <p>
          I am a computer science student, currently open for work opportunities
          in Finland.
        </p>
        <p>
          To contact me, you can mail me at
          <a href="mailto:mima@mimanet.net" target="_blank" rel="noopener"
            >mima@mimanet.net</a
          >
          or send me a message over at
          <a
            href="https://www.linkedin.com/in/mika-matti/"
            target="_blank"
            rel="noopener"
            >LinkedIn</a
          >
        </p>
        <p>
          All my projects showcased here can be found on my
          <a href="https://github.com/Mika-Matti" target="_blank" rel="noopener"
            >Github</a
          >
          account.
        </p>
      </div>
      <div class="image-container">
        <img
          class="image"
          src="@/assets/images/mima128.png"
          alt="Self portrait in pixel-art by me"
        />
        <p class="image-caption">Cheeky self portrait included.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/PageHeader.vue";

@Options({
  components: {
    PageHeader,
  },
})
export default class AboutView extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

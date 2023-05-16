<template>
  <div class="about">
    <h1>{{ pageHeader }}</h1>
    <div class="aboutcontent">
      <div class="text">
        <h3>Some things about me</h3>
        <p>
          I am a computer science student, currently open for work opportunities
          in Finland.
        </p>
        <p>
          To contact me, you can mail me at
          <a href="mailto:mimanetmail@gmail.com" target="_blank" rel="noopener"
            >mimanetmail@gmail.com</a
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

@Options({
  props: {
    pageHeader: String,
  },
})
export default class AboutPage extends Vue {
  pageHeader!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/components.scss";
</style>

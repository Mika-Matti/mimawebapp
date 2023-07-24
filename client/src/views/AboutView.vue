<template>
  <PageHeader />
  <div class="about">
    <div class="about-content">
      <h3>Some things about me</h3>
      <div class="image-container float-end">
        <img
          class="image"
          src="@/assets/images/mima128.png"
          alt="Self portrait in pixel-art by me"
        />
        <p class="image-caption">Cheeky self portrait included.</p>
      </div>
      <p>
        I am a computer science student, currently open for work opportunities
        in Finland. I have sufficient skills and understanding to work as a
        software developer, but I am forever curious about things and as such, I
        actively work to expand my understanding of concepts previously unknown
        to me. Right now one of my dreams is to advance more into the data
        science side of programming.
      </p>

      <p>
        The results my curiousity often turn out in form of small demos, such as
        my
        <a
          href="https://github.com/Mika-Matti/gifreader"
          target="_blank"
          rel="noopener"
          >Gifreader</a
        >
        or the
        <a
          href="https://github.com/Mika-Matti/3DPerspectiveDemo"
          target="_blank"
          rel="noopener"
        >
          3DPerspectiveDemo</a
        >
        I made, often having just one single purpose: Make something work, that
        I previously haven't known how.
      </p>

      <p>
        I do also sometimes complete much bigger projects on my freetime, such
        as
        <a
          href="https://github.com/Mika-Matti/csolitaire"
          target="_blank"
          rel="noopener"
        >
          this Solitaire game</a
        >, that I still play every day whenever I'm bored or
        <a
          href="https://github.com/Mika-Matti/mimawebapp"
          target="_blank"
          rel="noopener"
        >
          this website</a
        >, that you are currently browsing, which specifically took a lot of
        work in order to make the website more convenient to update whenever
        needed.
      </p>
      <p>
        In general, I just like to create stuff and it doesn't always have to be
        related to programming. For example, I tried my hand in drawing pixel
        art to use on this site, which was pretty fun.
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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PageHeader from "@/components/ui/PageHeader.vue";

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

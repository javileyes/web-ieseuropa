<template>
  <div>
    <v-footer dark padless>
      <v-card flat tile class="white--text text-center" color="brown">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon.url" class="mx-4 white--text" icon @click="redirect(icon.url)">
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          {{footerContent}}
        </v-card-text>

        <v-divider/>

        <v-card-text class="white--text" @click="login">
          {{ new Date().getFullYear() }} — <strong>IES Europa</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class FooterComponent extends Vue {
  count: number = 0
  icons = [
    {
      icon: "mdi-facebook",
      url: "1"
    },
    {
      icon: "mdi-twitter",
      url: "2"
    },
    {
      icon: "mdi-telegram",
      url: "3"
    },
    {
      icon: "mdi-instagram",
      url: "4"
    }
  ]
  footerContent = "Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.\n" +
      "          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus\n" +
      "          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim\n" +
      "          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula\n" +
      "          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus\n" +
      "          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum\n" +
      "          tempor vel ut orci. Orci varius natoque penatibus et magnis dis\n" +
      "          parturient montes, nascetur ridiculus mus."

  login() {
    this.count++
    console.log(this.count)
    if (this.count >= 3) {
      this.count = 0
      this.$router.replace("/login")
    }
  }
}

</script>
<template>
  <v-app>
    <HeaderComponent v-if="showMenu()"/>
    <v-main>
      <router-view />
    </v-main>
    <FooterComponent v-if="showMenu()"/>
    <SnackbarComponent/>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";

@Component({components: {HeaderComponent, FooterComponent, SnackbarComponent}})
export default class App extends Vue {

  showMenu() {
    return this.$route.name != null && this.$route.name != "Login"
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

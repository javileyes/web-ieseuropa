<template>
    <v-app>
        <HeaderComponent v-if="showMenu()"/>
        <v-main>
            <router-view/>
            <DialogComponent/>
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
import DialogComponent from "@/components/DialogComponent.vue";

@Component({components: {HeaderComponent, FooterComponent, SnackbarComponent, DialogComponent}})
export default class App extends Vue {

    showMenu() {
        return this.$route.name != null && this.$route.name != "Login" && this.$route.name != "Admin"
    }

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>

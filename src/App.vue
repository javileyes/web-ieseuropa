<template>
    <v-app>
        <HeaderComponent v-if="showMenu()"/>
        <v-main class="fondo">
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

@Component({
    metaInfo: {
        title: "IES Europa, Águilas",
        htmlAttrs: {
            lang: 'es'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'keyword', content: 'home,page' },
            { name: 'description', content: 'IES Europa es un Centro Educativo de la localidad de Águilas donde se imparte ESO, Bachiller y Formación Profesional' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { property: 'og:title', content: "IES Europa, Águilas"},
            { property: 'og:site_name', content: 'IES Europa'},
            {property: 'og:type', content: 'website'},
            {name: 'robots', content: 'index,follow'}
        ]
    },
    components: {
        HeaderComponent, FooterComponent, SnackbarComponent, DialogComponent}
})
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
.fondo {background: #ffe3e0}
</style>

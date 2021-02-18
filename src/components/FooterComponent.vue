<template>
    <div>
        <v-footer dark padless>
            <v-card flat tile width="100%" class="white--text text-center" color="primary">
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon.url" class="mx-4 white--text" icon
                           @click="redirect(icon.url)">
                        <v-icon size="24px">{{ icon.icon }}</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    {{ footerContent }}
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
import MetaInfo from "vue-meta"

@Component({
    metaInfo(): MetaInfo {
        return {
            title: "Redes Sociales - IES Europa",
            htmlAttrs: {
                lang: 'es'
            },
            meta: [
                {charset: 'utf-8'},
                {
                    name: 'description',
                    content: 'Las Redes Sociales de IES Europa están siempre informando'
                },
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {property: 'og:title', content: "Redes Sociales - IES Europa"},
                {property: 'og:site_name', content: 'IES Europa'},
                {property: 'og:type', content: 'section'},
                {name: 'robots', content: 'index,follow'}
            ]
        };
    }
})
export default class FooterComponent extends Vue {
    count: number = 0
    icons = [
        {
            icon: "mdi-facebook",
            url: "https://www.facebook.com/IES-EUROPA-203673183555320/"
        },
        {
            icon: "mdi-twitter",
            url: "https://twitter.com/europa_aguilas?lang=es"
        },
        {
            icon: "mdi-telegram",
            url: ""
        },
        {
            icon: "mdi-instagram",
            url: "https://www.instagram.com/ieseuropa/?hl=es"
        }
    ]
    footerContent = ""

    redirect(dir : string) {
        if (dir.length>1) window.open(dir, "_blank")
    }


    login() {
        this.count++
        console.log(this.count)
        if (this.count >= 3) {
            this.count = 0
            this.$router.push("/login")
        }
    }
}

</script>
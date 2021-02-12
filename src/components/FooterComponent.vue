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
    footerContent = ""


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
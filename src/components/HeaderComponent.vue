<template>
    <div>
        <v-app-bar color="#fcb69f" dark height="200px" src="@/assets/navbar-banner.jpg">
            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgb(255 245 226 / 80%)"/>
            </template>
            <v-container>
                <v-row>
                    <v-col class="d-flex flex-grow-0 align-center">
                        <v-img src="@/assets/logo.png" width="80" class="mr-4"/>
                        <v-toolbar-title class="header-title">IES Europa</v-toolbar-title>
                    </v-col>
                </v-row>
            </v-container>

        </v-app-bar>

        <v-bottom-navigation class="button-drawer" v-model="value" background-color="primary" dark height="63">
            <v-btn class="d-md-none" style="height: 100%; font-size: medium; margin-right: 5px" @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-menu open-on-hover offset-y bottom rounded="5" v-for="(button, index) in buttons" :key="index">

                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="d-none d-md-flex" style="height: 100% ; font-size: medium; margin-right: 5px" v-bind="attrs" v-on="on" @click="$router.replace(button.url)">
                        {{ button.title }}
                    </v-btn>
                </template>

                <v-list v-if="button.submenus">
                    <v-list-item class="tile" link v-for="(item, index) in button.submenus" :key="index" @click="$router.replace(item.url)">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>

            </v-menu>
        </v-bottom-navigation>

        <v-navigation-drawer v-model="drawer" fixed temporary dark color="primary">
            <v-list dense>
                <v-list-group
                    v-for="item in buttons" :key="item.title" link
                    :value="true" no-action color="white"
                    :append-icon="item.submenus ? '$expand' : ''"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class="navigation-title">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="submenu in item.submenus" :key="submenu.title" link
                        @click="$router.replace(submenu.url)" style="padding-left: 44px;"
                    >

                        <v-list-item-content>
                            <v-list-item-title>{{ submenu.title }}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BlogLabelService from "@/services/BlogLabelService";
import BlogLabel from "@/models/BlogLabel";


@Component
export default class HeaderComponent extends Vue {
    value: number = 1
    drawer = null
    blogMenuLabels: any = [{title: "Todas", url: "/noticias"}]
    blogLabels: BlogLabel[] = []

    buttons = [
        { title: "Inicio", url: "/" },
        { title: "Departamentos", url: "/departamentos" },
        { title: "Equipo Directivo", url: "/equipo-directivo" },
        { title: "Secretaria Virtual", url: "/secretaria" },
        { title: "Noticias", url: "/noticias", submenus: this.blogMenuLabels }
    ]

    items = [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
    ]


    created() {
        this.getBlogLabels()
    }

    async getBlogLabels() {
        await BlogLabelService.getBlogLabels(this, this.blogLabels)
        this.blogLabels.forEach(v => {
            this.blogMenuLabels.push({
                title: v.title,
                url: `/noticias/?q=${v.title}`
            })
        })
    }
}
</script>

<style>
.navigation-title {
    font-size: 18px!important;
}

.tile:hover {
    background: #B53B3D;
}

.tile:hover div {
    color: #ffffff;
}

.header-title {
    font-size: 54px!important;
    font-family: 'Abyssinica SIL'
}

@media (max-width: 960px) {
    .button-drawer {
        display: flex!important;
        justify-content: start!important;
    }

    .header-title {
        font-size: 40px!important;
    }
}
</style>
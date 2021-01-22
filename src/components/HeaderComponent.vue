<template>
    <div>
        <v-app-bar color="#fcb69f" dark height="200px" src="@/assets/navbar-banner.jpg">
            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgb(255 245 226 / 80%)"/>
            </template>

            <v-toolbar-title style="font-size: 44px;font-family: 'Abyssinica SIL'">IES Europa</v-toolbar-title>
        </v-app-bar>

        <v-bottom-navigation class="button-drawer" v-model="value" background-color="primary" dark height="63">
            <v-btn class="d-md-none" style="height: 100%; font-size: medium; margin-right: 5px" v-bind="attrs" v-on="on" @click.stop="drawer = !drawer">
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
                <v-list-item v-for="item in buttons" :key="item.title" link @click="$router.replace(item.url)">

                    <v-list-item-content>
                        <v-list-item-title class="navigation-title">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
    value: number = 1

    buttons = [
        { title: "Inicio", url: "/" },
        {
            title: "Departamentos",
            url: "/departamentos",
            submenus: [
                { title: 'Click Me', url: "#" },
                { title: 'Click Me', url: "#" }
            ]
        },
        {
            title: "Equipo Directivo",
            url: "/equipo-directivo",
            submenus: [
                { title: 'Click Me', url: "#" },
                { title: 'Click Me', url: "#" },
                { title: 'Click Me 2', url: "#" }
            ]
        },
        {
            title: "Secretaria Virtual",
            url: "/secretaria",
            submenus: [
                { title: 'Click Me', url: "#" },
                { title: 'Click Me', url: "#" },
                { title: 'Click Me', url: "#" },
                { title: 'Click Me 2', url: "#" }
            ]
        },
        { title: "Noticias", url: "/noticias" }
    ]

    drawer = null
    items = [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
    ]

    get color() {
        switch (this.value) {
            case 0:
                return 'blue-grey'
            case 1:
                return 'teal'
            case 2:
                return 'brown'
            case 3:
                return 'indigo'
            default:
                return 'blue-grey'
        }
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

@media (max-width: 960px) {
    .button-drawer {
        display: flex!important;
        justify-content: start!important;
    }
}
</style>
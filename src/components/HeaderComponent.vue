<template>
    <div>
        <v-app-bar color="#fcb69f" dark height="200px" src="@/assets/navbar-banner.jpg">
            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgb(255 245 226 / 80%)"/>
            </template>

            <v-toolbar-title style="font-size: 44px;font-family: 'Abyssinica SIL'">IES Europa</v-toolbar-title>
        </v-app-bar>

        <v-bottom-navigation v-model="value" background-color="primary" dark>
            <v-menu open-on-hover offset-y bottom rounded="5" v-for="(button, index) in buttons" :key="index">

                <template v-slot:activator="{ on, attrs }">
                    <v-btn style="height: 100%" v-bind="attrs" v-on="on" @click="$router.replace(button.url)">
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
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
    value: number = 1

    buttons = [
        {
            title: "Inicio",
            icon: "mdi-television-play",
            url: "/"
        },
        {
            title: "Departamentos",
            icon: "mdi-music-note",
            url: "/departamentos",
            submenus: [
                {title: 'Departamento', url: "/departamento"},
                {title: 'Click Me', url: "#"}
            ]
        },
        {
            title: "Equipo Directivo",
            icon: "mdi-book",
            url: "/directiva",
            submenus: [
                {title: 'Click Me', url: "#"},
                {title: 'Click Me', url: "#"},
                {title: 'Click Me 2', url: "#"}
            ]
        },
        {
            title: "Secretaria Virtual",
            icon: "mdi-image",
            url: "/secretaria",
            submenus: [
                {title: 'Click Me', url: "#"},
                {title: 'Click Me', url: "#"},
                {title: 'Click Me', url: "#"},
                {title: 'Click Me 2', url: "#"}
            ]
        }
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
.tile:hover {
    background: #B53B3D;
}

.tile:hover div {
    color: #ffffff;
}
</style>
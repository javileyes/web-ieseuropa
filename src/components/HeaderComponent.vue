<template>
    <div>
        <v-app-bar class="pointer" @click="$router.push('/')" color="#fcb69f" dark height="200px" src="@/assets/navbar-banner.jpg">
            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgb(255 245 226 / 80%)"/>
            </template>
            <v-container>
                <v-row no-gutters>
                    <v-col align-self="center" cols="2" md="1" class="mb-0">
                        <v-img class="logo" src="@/assets/logo.png"/>
                    </v-col>
                    <v-col align-self="center" cols="10" md="9" class="mt-5">
                            <v-row>
                                <v-toolbar-title class="header-title">IES Europa</v-toolbar-title>
                            </v-row>
                            <v-row>
                                <v-toolbar-title class="header-subtitle">Águilas (Región de Murcia)</v-toolbar-title>
                            </v-row>

                            <v-row class="mt-7 logo-line">
                                <v-img src="@/assets/logosTransparentesLinea.png"  class="hidden-md-and-up"/>
                            </v-row>
                    </v-col>
                    <v-col class="hidden-xs-only"  cols="0" md="2">
                        <v-img src="@/assets/LogosTransparentes.png" width="180" class="hidden-sm-and-down"/>
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
                    <v-btn class="d-none d-md-flex" style="height: 100% ; font-size: medium; margin-right: 5px" v-bind="attrs" v-on="on" @click="$router.push(button.url)">
                        {{ button.title }}
                    </v-btn>
                </template>

                <v-list v-if="button.submenus">
                    <v-list-item class="tile" link v-for="(item, index) in button.submenus" :key="index" @click="redirectSubmenu(item.url, item.external)">
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
                    @click="redirect(item.url, item.submenus)"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class="navigation-title">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="submenu in item.submenus" :key="submenu.title" link
                        @click="redirectSubmenu(submenu.url, submenu.external)" style="padding-left: 44px;"
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
import Family from "@/models/Family";
import FamilyService from "@/services/FamilyService";


@Component
export default class HeaderComponent extends Vue {
    value: number = 1
    drawer = null
    blogMenuLabels: any = [{title: "Todas", url: "/noticias"}]
    blogLabels: BlogLabel[] = []
    families: Family[] = []
    familiesMenu: any = []

    buttons = [
        { title: "Centro", url: "", submenus: [{title: "El Centro", url:"/centro"}, {title: "Equipo Directivo", url: "/equipo-directivo"}, {title: "Documentos Institucionales", url:"/documentos-institucionales"}] },
        { title: "Departamentos", url: "/departamentos" },
        // { title: "Ciclos Formativos", url: "" },
        { title: "Secretaría Virtual", url: "/secretaria" },
        { title: "Proyectos", url: "/proyectos" },
        { title: "Familias", submenus: this.familiesMenu},
        { title: "Noticias", url: "/noticias", submenus: this.blogMenuLabels }
    ]

    items = [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
    ]


    created() {
        this.getBlogLabels()
        this.getFamilies()
    }

    redirectSubmenu(url: string, externalUrl: string | null) {
        if (externalUrl) {
            window.open(externalUrl, "_blank")
        } else {
            this.$router.push(url)
        }
    }

    redirect(url: string, submenu: object | undefined) {
        if (submenu) {
            return
        } else {
            this.$router.push(url)
        }
    }

    async getFamilies() {
        await FamilyService.getFamilies(this, this.families)
        this.families.forEach(v => {
            this.familiesMenu.push({
                title: v.title,
                url: "/familia/" + v.id,
                external: v.url
            })
        })
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
    padding-left: 20px;
    font-size: 54px!important;
    font-weight: bold;
    color: #062d6e;
    font-family: 'Trebuchet MS',Tahoma,serif
}
.header-subtitle {
    padding-left: 20px;
    font-size: 30px!important;
    font-weight: bold;
    color: #062d6e;
    font-family: 'Trebuchet MS',Tahoma,serif
}
.logo {
    width: 90px;
}


.pointer {cursor: pointer;}

@media (max-width: 1265px) {

    .header-title {
        margin-top: 10px;
        font-size: 40px!important;
        padding-left: 20px;
        /*padding-right: 20px;*/
        /*margin-right: 20px;*/
    }
    .header-subtitle {
        padding-left: 20px;
        font-size: 25px!important;
    }

    .logo {
        width: 80px;
        margin-top: 10px;
        margin-left: 0px;
    }

}



@media (max-width: 959px) {
    .button-drawer {
        display: flex!important;
        justify-content: start!important;
    }

    .header-title {
        margin-top: 25px;
        font-size: 40px!important;
        padding-left: 0;
    }
    .header-subtitle {
        padding-left: 0;
        font-size: 25px!important;
    }

    .logo {
        width: 80px;
        margin-top: -10px;
        margin-left: 30px;
    }

    .logo-line {
        width: 400px;
        align-self: center;
    }

}

@media (max-width: 820px) {
    .header-title {
        margin-top: 30px;
    }

    .logo {
        margin-left: -5px;
    }

    .logo-line {
        width: 350px;
        padding-bottom: 10px;
        padding-left: 20px;
    }
}

@media (max-width: 599px) {
    .header-title {
        font-size: 35px!important;
        margin-top: 45px;
        padding-left: 20px;

    }
    .header-subtitle {
        padding-left: 20px;
        font-size: 18px!important;
    }
    .logo {
        width: 60px;
        margin-left: 5px;
        margin-bottom: -5px;
    }
    .logo-line {
        width: auto;
        margin-bottom: 0px;
        padding-right: 55px;
    }
}
@media (max-width: 540px) {
    .header-title {
        margin-top: 50px;
    }
    .logo {
        margin-bottom: 0px;
        margin-top: 7px;
    }
}

@media (max-width: 450px) {
    .header-title {
        font-size: 33px!important;
        padding-left: 30px;

    }
    .header-subtitle {
        font-size: 17px!important;
        padding-left: 30px;
    }
    .logo {
        margin-top: 10px;
    }
}
</style>
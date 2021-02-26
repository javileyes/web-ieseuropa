<template>
    <div>
        <v-card>
            <v-toolbar color="secondary" dark rounded="0">
                <v-toolbar-title>Administracion</v-toolbar-title>
                <v-spacer/>
                <v-menu bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="logout">
                            <v-list-item-title>Cerrar Sesión</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <template v-slot:extension>
                    <v-tabs v-model="tab" align-with-title>
                        <v-tabs-slider color="warning"></v-tabs-slider>
                        <v-tab v-for="item in items" :key="item">
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
                <v-tab-item>
                   <SecretaryAdminTab/>
                </v-tab-item>
                <v-tab-item>
                   <DepartmentAdminTab/>
                </v-tab-item>
                <v-tab-item>
                   <InformationSheetsAdminTab/>
                </v-tab-item>
                <v-tab-item>
                   <BlogAdminTab/>
                </v-tab-item>
                <v-tab-item>
                    <SliderAdminTab/>
                </v-tab-item>
                <v-tab-item>
                    <TeamAdminTab/>
                </v-tab-item>
                <v-tab-item>
                    <ImageAdminTab/>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LoginService from "@/services/LoginService";
import SecretaryAdminTab from "@/components/tabs/SecretaryAdminTab.vue";
import DepartmentAdminTab from "@/components/tabs/DepartmentAdminTab.vue";
import InformationSheetsAdminTab from "@/components/tabs/InformationSheetsAdminTab.vue";
import BlogAdminTab from "@/components/tabs/BlogAdminTab.vue";
import SliderAdminTab from "@/components/tabs/SliderAdminTab.vue";
import TeamAdminTab from "@/components/tabs/TeamAdminTab.vue";
import ImageAdminTab from "@/components/tabs/ImageAdminTab.vue";

@Component({components: {
        ImageAdminTab,
        SecretaryAdminTab,
        DepartmentAdminTab,
        InformationSheetsAdminTab,
        BlogAdminTab,
        SliderAdminTab,
        TeamAdminTab
}})
export default class AdminView extends Vue {
    items = ["Secretaría Virtual", "Departamentos", "Hojas Informativas", "Noticias", "Sliders", "Equipo Directivo", "Imagenes"]
    tab = null


    logout() {
        LoginService.logout(this)
    }
}
</script>
<template>
    <div>
        <v-app-bar color="primary" dense dark>
            <v-toolbar-title>Admin Panel</v-toolbar-title>
            <v-spacer/>
            <v-menu left bottom offset-y>
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
        </v-app-bar>

        <v-container>
            <v-row>
                <v-col cols="5">
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Secretaria Virtual</v-toolbar-title>
                        </v-toolbar>

                        <v-list>
                            <v-list-group v-for="item in category" :key="item.title" v-model="item.active" prepend-icon="mdi-folder" no-action>
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"/>
                                    </v-list-item-content>
                                </template>

                                <v-list-item v-for="child in item.items" :key="child.title">
                                    <v-icon>mdi-clipboard-text</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="child.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Categorias</v-toolbar-title>
                        </v-toolbar>
                    </v-card>
                </v-col>
                <v-col cols>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Subir documentos</v-toolbar-title>
                        </v-toolbar>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LoginService from "@/services/LoginService";

@Component
export default class AdminView extends Vue {
    logout() {
        LoginService.logout(this)
    }

    category = [
        {
            title: 'Category 1',
            items: [
                { title: 'List Item' }
            ],
        },
        {
            title: 'Category 2',
            items: [
                { title: 'Breakfast & brunch' },
                { title: 'New American' },
                { title: 'Sushi' },
            ],
        },
        {
            title: 'Category 3',
            items: [
                { title: 'Breakfast & brunch' },
                { title: 'New American' },
                { title: 'Sushi' },
            ],
        },
        {
            title: 'Category 4',
            items: [
                { title: 'Breakfast & brunch' },
                { title: 'New American' },
                { title: 'Sushi' },
            ],
        },

    ]
}
</script>
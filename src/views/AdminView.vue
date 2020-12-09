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

                                <v-list-item v-for="(resource, index) in item.resources" :key="index" >
                                    <v-icon class="mr-3">mdi-clipboard-text</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="resource.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Crear Categorias</v-toolbar-title>
                        </v-toolbar>

                        <v-form>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Nombre" filled clearable />
                                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="loader = 'loading'">
                                            Crear
                                            <template v-slot:loader>
                                                <span>Loading...</span>
                                            </template>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </v-card>
                </v-col>
                <v-col cols>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Subir Documentos</v-toolbar-title>
                        </v-toolbar>

                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Nombre" filled clearable />
                                    <v-file-input filled v-model="file" placeholder="Suba su documento" label="Documento" append-icon="mdi-paperclip" prepend-icon="">
                                        <template v-slot:selection="{ text }">
                                            <v-chip small label color="primary">
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                    <v-select :items="category" filled label="Categoria" dense>
                                        <template v-slot:item="{item}">
                                            {{item.title}}
                                        </template>
                                        <template v-slot:selection="{item}">
                                            {{item.title}}
                                        </template>
                                    </v-select>
                                    <v-btn block :loading="loading" :disabled="loading" color="success" @click="loader = 'loading'">
                                        Guardar
                                        <template v-slot:loader>
                                            <span>Loading...</span>
                                        </template>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
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

    file = null
    loader = null
    loading = false


    logout() {
        LoginService.logout(this)
    }

    category = [
        {
            title: 'Category 1',
            resources: [
                { title: 'Documento 1' }
            ],
        },
        {
            title: 'Category 2',
            resources: [
                { title: 'Documento 2' },
                { title: 'Documento 3' },
                { title: 'Documento 4' },
            ],
        },
        {
            title: 'Category 3',
            resources: [
                { title: 'Documento 5' },
                { title: 'Documento 6' },
                { title: 'Documento 7' },
            ],
        },
        {
            title: 'Category 4',
            resources: [
                { title: 'Documento 8' },
                { title: 'Documento 9' },
                { title: 'Documento 10' },
            ],
        },

    ]
}
</script>
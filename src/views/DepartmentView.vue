<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Departamento de </h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-card class="mb-4">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Profesores</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table :headers="headers" :items="teachers" hide-default-footer :loading="false" loading-text="Loading... Please wait"/>
                    </v-card>
                    <v-divider class="mx-4"/>
                    <v-card class="mt-4">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Hojas informativas</v-toolbar-title>
                        </v-toolbar>
                        <v-chip v-for="resource in 9" :key="resource" class="ma-2 pa-2" color="success" label>
                            <v-btn icon link target="_blank" dark class="ma-1">
                                <v-icon left>
                                    mdi-clipboard-text
                                </v-icon>
                            </v-btn>
                            Documento {{ resource }}
                        </v-chip>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card :loading="loading" class="ma-4">
                        <template slot="progress">
                            <v-progress-linear :active="loading" color="deep-purple" height="10" indeterminate/>
                        </template>
                        <v-img height="250" src="@/assets/departments-banner.jpg"/>
                        <v-card-title>Departamento de</v-card-title>
                        <v-card-text>
                            <div>Descárgate tus documentos y agiliza tus gestiones</div>
                        </v-card-text>

                        <v-divider class="mx-4"/>

                        <v-img src="@/assets/posit.png" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class DepartmentView extends Vue {
    headers = [
        { text: "Profesores", value: "teacher" },
        { text: "Cargo", value: "position" },
        { text: "Contacto", value: "mail" },
        { text: "Horario de atencion", value: "schedule" }
    ]
    teachers = [
        { teacher: "Silvio Franco", position: "Jefe Departamento", mail: "Silviofrancoxa8@gmail.com", schedule: "de 11AM a 1PM"}
    ]
}
</script>
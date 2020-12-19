<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Departamentos</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-row>
                        <v-col v-for="department in departments" :key="department.title" class="d-flex child-flex" cols="4">
                            <v-card hover @click="$router.replace('/departamento/' + department.id)">
                                <v-img aspect-ratio="1" class="grey lighten-2" :src="department.image.url" />
                                <v-card-title class="title">
                                    {{ department.title }}
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="4">
                    <v-card :loading="loading" class="ma-4">
                        <template slot="progress">
                            <v-progress-linear :active="loading" color="deep-purple" height="10" indeterminate/>
                        </template>
                        <v-img height="250" src="@/assets/departments-banner.jpg"/>
                        <v-card-title>Departamentos</v-card-title>
                        <v-card-text>
                            <div>Encuentra información sobre los distintos departamentos</div>
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
import DepartmentService from "@/services/DepartmentService";
import DepartmentContent from "@/models/DepartmentContent";

@Component
export default class DepartmentsView extends Vue {
    loading: boolean = false

    departments: DepartmentContent[] = [
        // { title: "Biologia", img: require("@/assets/departments/biologia.png") },
        // { title: "Dibujo", img: require("@/assets/departments/dibujo.jpg") },
        // { title: "Economia", img: require("@/assets/departments/economia.png") },
        // { title: "Educacion Fisica", img: require("@/assets/departments/deportes.png") },
        // { title: "Filosofia", img: require("@/assets/departments/filosofia.png") },
        // { title: "Quimica", img: require("@/assets/departments/quimica.png") },
        // { title: "Frances", img: require("@/assets/departments/frances.png") },
        // { title: "Historia", img: require("@/assets/departments/historia.png") },
        // { title: "Ingles", img: require("@/assets/departments/ingles.png") },
        // { title: "Latin", img: require("@/assets/departments/latin.png") },
        // { title: "Lengua", img: require("@/assets/departments/lengua.png") },
        // { title: "Matematicas", img: require("@/assets/departments/matematicas.png") },
        // { title: "Musica", img: require("@/assets/departments/musica.png") },
        // { title: "Orientacion", img: require("@/assets/departments/orientacion.png") },
        // { title: "Religion", img: require("@/assets/departments/religion.png") },
        // { title: "Tecnologia", img: require("@/assets/departments/tecnologia.png") },
    ]

    created() {
        DepartmentService.getDepartments(this, this.departments)
    }

}
</script>


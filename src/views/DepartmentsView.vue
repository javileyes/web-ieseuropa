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
                            <v-progress-linear :active="loading" color="warning" indeterminate/>
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

    departments: DepartmentContent[] = []

    created() {
        DepartmentService.getDepartments(this, this.departments)
    }

}
</script>


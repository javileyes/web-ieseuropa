<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Departamento de {{department.title}}</h1>
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
                        <v-data-table :headers="headers" :items="department.teachers" hide-default-footer :loading="loading" loading-text="Loading... Please wait"/>
                    </v-card>
                    <v-divider class="mx-4"/>
                    <v-card class="mt-4">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Hojas informativas</v-toolbar-title>
                        </v-toolbar>
                        <v-chip v-for="resource in department.resources" :key="resource" class="ma-2 pa-2" color="success" label>
                            <v-btn icon :href="resource.document.url" link target="_blank" dark class="ma-1">
                                <v-icon left>
                                    mdi-clipboard-text
                                </v-icon>
                            </v-btn>
                            {{ resource.title }}
                        </v-chip>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card :loading="loading" class="ma-4">
                        <template slot="progress">
                            <v-progress-linear :active="loading" color="deep-purple" height="10" indeterminate/>
                        </template>
                        <v-img height="250" src="@/assets/departments-banner.jpg"/>
                        <v-card-title>Departamento de {{department.title}}</v-card-title>
                        <v-card-text>
                            <div>Consulte informacion sobre su departamento</div>
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
import {getModule} from "vuex-module-decorators";
import DepartmentsModule from "@/store/DepartmentsModule";
import DepartmentContent from "@/models/DepartmentContent";
import DepartmentService from "@/services/DepartmentService";

@Component
export default class DepartmentView extends Vue {
    loading: boolean = false
    departmentsModule: DepartmentsModule = getModule(DepartmentsModule)
    headers = [
        { text: "Profesores", value: "fullName" },
        { text: "Cargo", value: "position" },
        { text: "Contacto", value: "email" },
        { text: "Horario de atencion", value: "schedule" }
    ]
    department: DepartmentContent | undefined = new DepartmentContent()


    created() {
        if (this.departmentsModule.departments.length <= 0) {
            DepartmentService.getDepartment(this, parseInt(this.$route.params.id))
        } else {
            this.department = this.departmentsModule.departments.find(d => {
                return d.id == parseInt(this.$route.params.id)
            })
        }
    }
}
</script>
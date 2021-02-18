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
            <v-row align="center" justify="center">
                <v-col cols>
                    <v-img class="dep_banner"
                        :src="department.banner.url"
                        lazy-src="/cargando-min.png"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="8">
                    <v-card class="mb-4">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Profesores</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table style="background: #edf4fc" disable-sort :headers="headers" :items="department.teachers" hide-default-footer :loading="loading" loading-text="Loading... Please wait"/>
                    </v-card>
                    <v-divider class="mx-4"/>
                    <v-card style="background: #edf4fc" class="mt-4">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Hojas informativas</v-toolbar-title>
                        </v-toolbar>
                        <v-chip v-for="resource in department.documents" :key="resource" :href="resource.url" class="ma-2 pa-2" color="#d1daf8" label>
                            <v-icon color="secondary" left>
                                mdi-clipboard-text
                            </v-icon>
                            <span style="color:black; font-weight: bold">{{ resource.description }}</span>
                        </v-chip>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card style="background: #edf4fc" :loading="loading" class="ma-4">
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
    department: DepartmentContent | undefined = new DepartmentContent()
    headers = [
        { text: "Profesores", value: "fullName" },
        { text: "Cargo", value: "position" },
        { text: "Contacto", value: "email" },
        { text: "Horario de atencion", value: "schedule" }
    ]


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

<style>
.dep_banner {
    height: 500px!important;
}

@media (max-width: 1000px) {
    .dep_banner {
        height: 230px!important;
    }

}
</style>
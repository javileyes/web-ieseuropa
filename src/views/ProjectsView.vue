<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Proyectos</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" md="8">
                    <v-container>
                        <v-row>
                            <v-col v-for="project in projects" :key="project.title" class="d-flex child-flex" cols="6" sm="6" md="4">
                                <v-card hover @click="$router.push('/proyecto/' + project.id)">
                                    <v-img aspect-ratio="1" class="grey lighten-2" :src="project.banner.url" />
                                    <v-card-title style="background:#edf4fc" class="title">
                                        {{ project.title }}
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col sm="12" md="4">
                    <v-card style="background: #edf4fc" :loading="loading" class="ma-4">
                        <template slot="progress">
                            <v-progress-linear :active="loading" color="warning" indeterminate/>
                        </template>
                        <v-img height="250" src="@/assets/departments-banner.jpg"/>
                        <v-card-title>Proyectos</v-card-title>
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
import Project from "@/models/Project";
import ProjectService from "@/services/ProjectService";

@Component
export default class ProjectView extends Vue {
    loading: boolean = false
    projects: Project[] = []

    created() {
        ProjectService.getProjects(this, this.projects)
    }
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Proyectos</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-data-table :headers="headers" :items="projects">
                        <template v-slot:item.banner="{item}">
                            <v-btn class="ma-1" text icon color="success" :href="item.banner.url" target="_blank">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:item.actions="{item}">
                            <v-btn class="ma-1" text icon color="success" @click="switchDialog(item)">
                                <v-icon>mdi-table-edit</v-icon>
                            </v-btn>
                            <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteProject(item.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col>
                <PostProjectPanel :refresh="refresh"/>
            </v-col>
            <PatchProjectDialogPanel :project="project" :refresh="refresh" :dialog="dialog" :switchDialog="switchDialog" />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Project from "@/models/Project";
import ProjectService from "@/services/ProjectService";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import PostProjectPanel from "@/components/panel/PostProjectPanel.vue";
import PatchProjectDialogPanel from "@/components/panel/PatchProjectDialogPanel.vue";
import Blog from "@/models/Blog";
@Component({
    components: {PatchProjectDialogPanel, PostProjectPanel}
})
export default class ProjectAdminTab extends Vue {
    loading: boolean = false
    dialog: boolean = false
    projects: Project[] = []
    project: Project = new Project()
    headers = [
        { text: 'Title', value: 'title' },
        { text: 'Banner', value: 'banner' },
        { text: 'Acciones', value: 'actions' }
    ]


    refresh() {
        ProjectService.getProjects(this, this.projects)
    }

    created() {
        this.refresh()
    }

    deleteProject(id: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar el proyecto?",
            () => ProjectService.deleteProject(this, id)
        ))
    }

    switchDialog(project: Project) {
        this.project = {...project}
        this.dialog ? this.dialog = false : this.dialog = true
    }
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col sm="12" md="8">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Departamentos</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-list>
                        <v-list-group v-for="department in departments" :key="department.title" prepend-icon="mdi-folder" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="department.title"/>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="(document, index) in department.documents" :key="index" >
                                <v-icon class="mr-3">mdi-clipboard-text</v-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="document.description"></v-list-item-title>
                                </v-list-item-content>
                                <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteDocument(department.id, document.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols>
                <PostDepartmentDocumentPanel :departments="departments" :refresh="refresh"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import DepartmentContent from "@/models/DepartmentContent";
import DepartmentService from "@/services/DepartmentService";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import ResourceService from "@/services/ResourceService";
import PostDepartmentDocumentPanel from "@/components/panel/PostDepartmentDocumentPanel.vue";

@Component({components: {PostDepartmentDocumentPanel}})
export default class InformationSheetsAdminTab extends Vue {
    loading: boolean = false
    departments: DepartmentContent[] = []


    created() {
        this.refresh()
    }

    refresh() {
        DepartmentService.getDepartments(this, this.departments)
    }

    deleteDocument(id: number, documentId: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar este documento?",
            () => DepartmentService.deleteDepartmentDocument(this, id, documentId)
        ))
    }
}
</script>
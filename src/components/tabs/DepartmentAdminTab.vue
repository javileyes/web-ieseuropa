<template>
    <v-container>
        <v-row>
            <v-col cols="5">
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

                            <v-list-item v-for="(teacher, index) in department.teachers" :key="index" >
                                <v-icon class="mr-3">mdi-account</v-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="teacher.fullName"></v-list-item-title>
                                </v-list-item-content>
                                <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteTeacher(teacher.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols>
                <PostDepartmentPanel :refresh="refresh" />
                <PatchDepartmentPanel :refresh="refresh" :departments="departments" />
            </v-col>
            <v-col cols>
                <PostTeacherPanel :refresh="refresh" :departments="departments" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import DepartmentContent from "@/models/DepartmentContent";
import DepartmentService from "@/services/DepartmentService";
import PostDepartmentPanel from "@/components/panel/PostDepartmentPanel.vue";
import PostTeacherPanel from "@/components/panel/PostTeacherPanel.vue";
import PatchDepartmentPanel from "@/components/panel/PatchDepartmentPanel.vue";
import TeachersService from "@/services/TeachersService";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";

@Component({components: {PostDepartmentPanel, PostTeacherPanel, PatchDepartmentPanel}})
export default class DepartmentAdminTab extends Vue {
    loading: boolean = false
    departments: DepartmentContent[] = []


    created() {
        this.refresh()
    }

    refresh() {
        DepartmentService.getDepartments(this, this.departments)
    }

    deleteTeacher(teacherId: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar este profesor?",
            () => TeachersService.deleteTeacher(this, teacherId)
        ))
    }
}
</script>
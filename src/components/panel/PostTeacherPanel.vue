<template>
    <v-card class="mb-6">
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Añadir Profesores</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="teacher.fullName" label="Nombre" filled clearable :rules="titleRules" />
                        <v-text-field v-model="teacher.email" label="Email" filled clearable :rules="emailRules" />
                        <v-text-field v-model="teacher.position" label="Cargo" filled clearable :rules="titleRules" />
                        <v-text-field v-model="teacher.subject" label="Asignatura" filled clearable :rules="titleRules" />
                        <v-text-field v-model="teacher.schedule" label="Horario" filled clearable :rules="titleRules" />
                        <v-select :items="departments" v-model="department" filled label="Departamento" dense>
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>
                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postTeacher">
                            Añadir
                            <template v-slot:loader>
                                <span>Loading...</span>
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import TeacherContent from "@/models/TeacherContent";
import TeachersService from "@/services/TeachersService";
import DepartmentContent from "@/models/DepartmentContent";
import StringTool from "@/services/tool/StringTool";

@Component
export default class PostTeacherPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly departments!: DepartmentContent[]
    loading: boolean = false
    teacher: TeacherContent = new TeacherContent()
    department: DepartmentContent = new DepartmentContent()
    titleRules = [(v: string) => v && v.length > 0 ? true : "Este campo es requerido"]
    emailRules = [
        (v: string) => v.length > 0 ? true : "Email requerido",
        (v: string) => StringTool.validateEmail(v) ? true : "Email no es válido"
    ]


    postTeacher() {
        if (this.form.validate() && this.department.id) {
            TeachersService.postTeacher(this, this.teacher, this.department.id);
        }
    }

}
</script>
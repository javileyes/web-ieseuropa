<template>
    <v-card class="mt-6">
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Editar Departamento</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-select :items="departments" v-model="department" filled label="Departamento" dense>
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>
                        <v-text-field v-model="title" label="Nuevo Titulo" filled clearable />
                        <v-file-input
                            filled v-model="imageFile"
                            placeholder="Suba una imagen"
                            label="image" append-icon="mdi-file-image"
                            prepend-icon=""
                        />
                        <v-file-input
                            filled v-model="bannerFile"
                            placeholder="Suba una banner"
                            label="banner" append-icon="mdi-file-image"
                            prepend-icon=""
                        />
                        <v-btn width="40%" class="mr-1" :loading="loading" :disabled="loading" color="error" @click="deleteDepartment">
                            Eliminar
                            <template v-slot:loader>
                                <span>Loading...</span>
                            </template>
                        </v-btn>
                        <v-btn width="58%" :loading="loading" :disabled="loading" color="success" @click="patchDepartment">
                            Editar
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
import DepartmentContent from "@/models/DepartmentContent";
import DepartmentService from "@/services/DepartmentService";

@Component
export default class PatchDepartmentPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly departments!: DepartmentContent[]
    department: DepartmentContent = new DepartmentContent()
    loading: boolean = false
    title: string = ""
    imageFile: File | null = null
    bannerFile: File | null = null
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    imageRules = [(v: File) => v ? true : "Seleccione una Imagen"]


    deleteDepartment() {
        if (this.form.validate() && this.department.id) {
            DepartmentService.deleteDepartment(this, this.department.id);
        }
    }

    patchDepartment() {
        if (this.form.validate() && this.department.id) {
            DepartmentService.patchDepartment(this, this.title, this.imageFile, this.bannerFile, this.department.id)
        }
    }
}
</script>
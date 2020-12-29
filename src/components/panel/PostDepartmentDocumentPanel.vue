<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Subir Documentos</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="title" label="Nombre" :rules="titleRules" filled clearable />
                        <v-file-input
                            filled v-model="documentFile"
                            placeholder="Suba su documento"
                            label="Documento" append-icon="mdi-paperclip"
                            prepend-icon="" :rules="documentRules"
                        />

                        <v-select :items="departments" v-model="department" filled label="Departamentos" dense>
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>

                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postResource">
                            Guardar
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
export default class PostDepartmentDocumentPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly departments!: DepartmentContent[]
    loading: boolean = false
    documentFile: File | null = null
    department: DepartmentContent = new DepartmentContent()
    title: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    documentRules = [(v: File) => v ? true : "Seleccione un Documento"]


    postResource() {
        if (this.form.validate()) {
            DepartmentService.postDepartmentDocument(this, this.title, this.documentFile, this.department.id!)
        }
    }
}
</script>
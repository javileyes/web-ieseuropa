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
                            filled v-model="resourceFile"
                            placeholder="Suba su documento"
                            label="Documento" append-icon="mdi-paperclip"
                            prepend-icon="" :rules="documentRules"
                        />

                        <v-select v-if="categories" :items="categories" v-model="category" filled label="Categoria" dense>
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>

                        <v-select v-if="departments" :items="departments" v-model="department" filled label="Departamento" dense>
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
import ResourceCategory from "@/models/ResourceCategory";
import ResourceService from "@/services/ResourceService";
import DepartmentContent from "@/models/DepartmentContent";

@Component
export default class PostResourcePanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly categories!: ResourceCategory[]
    @Prop() readonly departments!: DepartmentContent[]
    loading: boolean = false
    resourceFile: File | null = null
    category: ResourceCategory = new ResourceCategory()
    department: DepartmentContent = new DepartmentContent()
    title: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    documentRules = [(v: File) => v ? true : "Seleccione un Documento"]


    postResource() {
        if (this.form.validate()) {
            ResourceService.postResource(this, this.resourceFile, this.title, this.category.id, this.department.id);
        }
    }
}
</script>
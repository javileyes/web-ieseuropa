<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Crear Departamentos</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="title" label="Nombre"
                            :rules="titleRules" filled clearable
                        />
                        <v-file-input
                            filled v-model="imageFile"
                            placeholder="Suba una imagen"
                            label="image" append-icon="mdi-file-image"
                            prepend-icon="" :rules="imageRules"
                        />
                        <v-file-input
                            filled v-model="bannerFile"
                            placeholder="Suba una banner"
                            label="banner" append-icon="mdi-file-image"
                            prepend-icon="" :rules="imageRules"
                        />
                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postDepartment">
                            Crear
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
import DepartmentService from "@/services/DepartmentService";

@Component
export default class PostDepartmentPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    loading: boolean = false
    title: string = ""
    imageFile: File | null = null
    bannerFile: File | null = null
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    imageRules = [(v: File) => v ? true : "Seleccione una Imagen"]


    postDepartment() {
        if (this.form.validate()) {
            DepartmentService.postDepartment(this, this.title, this.imageFile, this.bannerFile)
        }
    }
}
</script>
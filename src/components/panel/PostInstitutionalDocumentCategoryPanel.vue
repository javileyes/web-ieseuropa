<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Crear Categoria</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="title" label="Titulo" filled clearable :rules="titleRules" />
                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postCategory">
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
import InstitutionalDocumentCategoryService from "@/services/InstitutionalDocumentCategoryService";

@Component
export default class PostInstitutionalDocumentCategoryPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    loading: boolean = false
    title: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]


    postCategory() {
        if (this.form.validate()) {
            InstitutionalDocumentCategoryService.postInstitutionalDocumentCategory(this, this.title)
        }
    }
}
</script>
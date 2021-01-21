<template>
    <v-card class="mb-6">
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Crear Etiquetas</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="title" label="Titulo" :rules="titleRules" filled clearable />

                        <v-file-input
                            filled v-model="imageFile"
                            placeholder="Suba una imagen"
                            label="image" append-icon="mdi-file-image"
                            prepend-icon="" :rules="imageRules"
                        />

                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postBlogLabel">
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
import BlogLabelService from "@/services/BlogLabelService";

@Component
export default class PostBlogLabelPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    loading: boolean = false
    imageFile: File | null = null
    title: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    imageRules = [(v: File) => v ? true : "Seleccione una Imagen"]

    postBlogLabel() {
        if (this.form.validate()) {
            BlogLabelService.postBlogLabel(this, this.title, this.imageFile)
        }
    }
}
</script>
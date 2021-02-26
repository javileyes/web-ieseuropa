<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Guardar Imagenes</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="title" label="Titulo"
                            :rules="titleRules" filled clearable
                        />
                        <v-text-field
                            v-model="key" label="Key"
                            :rules="titleRules" filled clearable
                        />
                        <v-file-input
                            filled v-model="imageFile"
                            placeholder="Suba una imagen"
                            label="image" append-icon="mdi-file-image"
                            prepend-icon="" :rules="imageRules"
                        />
                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postImage">
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
import ImageService from "@/services/ImageService";

@Component
export default class PostImagePanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    loading: boolean = false
    title: string = ""
    key: string = ""
    imageFile: File | null = null
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    imageRules = [(v: File) => v ? true : "Seleccione una Imagen"]


    postImage() {
        if (this.form.validate()) {
            ImageService.postImage(this, this.title, this.key, this.imageFile)
        }
    }
}
</script>
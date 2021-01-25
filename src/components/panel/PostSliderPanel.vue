<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Crear Slider</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="title" label="Title" :rules="titleRules" filled clearable />
                        <v-text-field v-model="url" label="Enlace" filled clearable />
                        <v-file-input
                            filled v-model="imageFile"
                            placeholder="Suba un banner"
                            label="Imagen" append-icon="mdi-paperclip"
                            prepend-icon="" :rules="imageRules"
                        />

                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postSlider">
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
import SliderService from "@/services/SliderService";

@Component
export default class PostSliderPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    loading: boolean = false
    imageFile: File | null = null
    title: string = ""
    url: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    imageRules = [(v: File) => v ? true : "Seleccione un Imagen"]


    postSlider() {
        if (this.form.validate()) {
            SliderService.postSlider(this, this.title, this.url, this.imageFile)
        }
    }
}
</script>
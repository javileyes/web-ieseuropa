<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Añadir banners a una noticia</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-select :items="blogs" v-model="blog" filled label="Noticias" dense>
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>

                        <v-file-input
                            filled v-model="imageFile"
                            placeholder="Suba una imagen"
                            label="image" append-icon="mdi-file-image"
                            prepend-icon="" :rules="imageRules"
                        />

                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postBlogImage">
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
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";

@Component
export default class PostBlogImagePanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly blogs!: Blog[]
    loading: boolean = false
    blog: Blog = new Blog()
    imageFile: File | null = null
    imageRules = [(v: File) => v ? true : "Seleccione una Imagen"]

    postBlogImage() {
        if (this.form.validate()) {
            BlogService.postBlogImage(this, this.imageFile, this.blog.id!)
        }
    }
}
</script>
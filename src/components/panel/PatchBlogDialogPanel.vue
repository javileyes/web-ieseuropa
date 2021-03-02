<template>
    <v-dialog class="fill-height" v-model="dialog" persistent width="100%">
        <v-card v-if="blog">
            <v-toolbar flat dark color="secondary">
                <v-btn icon dark @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Editar Noticia</v-toolbar-title>
            </v-toolbar>
            <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-space-between">
                                <v-file-input hide-input small-chips style="margin: 0; padding: 0" v-model="imageFile"/>
                                <v-btn text color="blue" @click="postBlogImage()" :disabled="!imageFile">Añadir Banners</v-btn>
                            </div>
                            <v-container>
                                <v-row>
                                    <v-col v-for="image in blog.images" :key="image.id" cols="3">
                                        <v-img :src="image.url" class="grey lighten-2" height="116">
                                            <template v-slot:default>
                                                <div class="fill-height d-flex justify-center align-center">
                                                    <v-btn outlined fab color="error" @click="deleteBlogImage(blog.id, image.id)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </div>
                                            </template>
                                        </v-img>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-divider class="mb-5"/>
                            <v-row justify="start">
                                <v-col cols="2" md="3" sm="4">
                                    <v-checkbox color="secondary" v-model="marking" label="Interactivo"/>
                                </v-col>
                                <v-col class="mt-3">
                                    <v-btn icon color="secondary" @click="inicio">
                                        COMPROBAR
                                        <v-icon>mdi-crosshairs-gps</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="blog.title" :rules="titleRules" label="Titulo" filled clearable />
                            <p hidden ref="markedId">{{blog.body}}</p>
                            <v-textarea @click="inicio" filled auto-grow clearable clear-icon="mdi-close-circle" name="input-7-4" label="Cuerpo" v-model="blog.body" :rules="bodyRules"/>

                            <v-select
                                :items="labels" filled
                                label="Etiqueta" v-model="blog.label"
                            >
                                <template v-slot:item="{item}">
                                    {{item.title}}
                                </template>
                                <template v-slot:selection="{item}">
                                    {{item.title}}
                                </template>
                            </v-select>


                            <v-btn block :loading="loading" :disabled="loading" color="success" @click="patchBlog">
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
    </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator"
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";
import BlogLabel from "@/models/BlogLabel";
import {getModule} from "vuex-module-decorators";
import SnackbarModule from "@/store/SnackbarModule";
import Marked from "marked"

@Component
export default class PatchBlogDialogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly blog!: Blog
    @Prop() readonly labels!: BlogLabel[]
    @Prop() readonly refresh!: any
    @Prop() readonly switchDialog!: any
    @Prop() dialog!: boolean
    @Ref() readonly markedId!: HTMLParagraphElement
    marking: boolean = true
    loading: boolean = false
    imageFile: File | null = null
    titleRules = [(v: string) => v && v.length > 0 ? true : "Nombre requerido"]
    bodyRules = [(v: string) => v && v.length > 0 ? true : "Cuerpo requerido"]

    inicio() {
        this.markedId.removeAttribute("hidden")
        this.markedId.innerHTML = Marked(this.blog.body!)
    }

    @Watch('blog.body')
    onBody() {
        if (this.marking) this.markedId.innerHTML = Marked(this.blog.body!)
    }

    patchBlog() {
        if (this.form.validate()) {
            BlogService.patchBlog(this, this.blog.title, this.blog.body, this.blog.label!.id!, this.blog.id!)
        }
    }

    deleteBlogImage(id: number, imageId: number) {
        BlogService.deleteBlogImage(this, id, imageId)
    }

    postBlogImage() {
        if (this.blog.images!.length < 10) {
            BlogService.postBlogImage(this, this.imageFile, this.blog.id!)
        } else {
            getModule(SnackbarModule).makeToast("No se pueden adjuntar mas de 10 imagenes")
        }
    }

    close() {
        this.refresh()
        this.switchDialog()
    }
}
</script>
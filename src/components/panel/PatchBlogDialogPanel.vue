<template>
    <v-dialog class="fill-height" v-model="dialog" persistent max-width="600">
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
                            <v-text-field v-model="blog.title" :rules="titleRules" label="Titulo" filled clearable />

                            <v-textarea filled name="input-7-4" label="Cuerpo" v-model="blog.body" :rules="bodyRules"/>

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
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";
import BlogLabel from "@/models/BlogLabel";

@Component
export default class PatchBlogDialogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly blog!: Blog
    @Prop() readonly labels!: BlogLabel[]
    @Prop() readonly refresh!: any
    @Prop() readonly switchDialog!: any
    @Prop() dialog!: boolean
    loading: boolean = false
    titleRules = [(v: string) => v && v.length > 0 ? true : "Nombre requerido"]
    bodyRules = [(v: string) => v && v.length > 0 ? true : "Cuerpo requerido"]


    patchBlog() {
        if (this.form.validate()) {
            BlogService.patchBlog(this, this.blog.title, this.blog.body, this.blog.label!.id!, this.blog.id!)
        }
    }

    close() {
        this.refresh()
        this.switchDialog()
    }
}
</script>
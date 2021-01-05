<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Crear Noticia</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field v-model="title" label="Titulo" :rules="titleRules" filled clearable />

                        <v-textarea filled name="input-7-4" label="Cuerpo" v-model="body" :rules="bodyRules"/>

                        <v-select
                            :items="labels" filled
                            label="Etiqueta" v-model="label"
                        >
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>

                        <v-btn block :loading="loading" :disabled="loading" color="success" @click="postBlog">
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
import BlogLabel from "@/models/BlogLabel";
import BlogService from "@/services/BlogService";

@Component
export default class PostBlogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly labels!: BlogLabel[]
    label: BlogLabel = new BlogLabel()
    loading: boolean = false
    title: string = ""
    body: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    bodyRules = [(v: string) => v && v.length > 0 ? true : "Cuerpo requerido"]

    postBlog() {
        if (this.form.validate()) {
            BlogService.postBlog(this, this.title, this.body, this.label.id!)
        }
    }
}
</script>
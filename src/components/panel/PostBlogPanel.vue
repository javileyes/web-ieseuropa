<template>
    <Fullscreen ref="fullscreen" @change="fullscreenChange">
        <v-card height="100%" style="overflow: scroll">
            <v-toolbar color="secondary" dark>
                <v-toolbar-title>Crear Noticia</v-toolbar-title>
                <v-spacer/>
                <v-btn icon @click="$refs['fullscreen'].toggle()">
                    <v-icon>{{ fullscreen ? "mdi-arrow-collapse" : "mdi-arrow-expand" }}</v-icon>
                </v-btn>
            </v-toolbar>
            <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
            <v-form ref="form">
                <v-container>
                    <v-row justify="space-between">
                        <v-col cols="6">
                            <v-checkbox color="secondary" v-model="marking" label="Interactivo"/>
                        </v-col>
                        <v-col cols="6" class="mt-3">
                            <v-btn icon color="secondary" @click="checkmarkdown">
                                COMPROBAR
                                <v-icon>mdi-crosshairs-gps</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="title" label="Titulo" :rules="titleRules" filled clearable />
                            <p ref="markedId">{{body}}</p>
                            <v-textarea
                                filled auto-grow clearable clear-icon="mdi-close-circle"
                                name="input-7-4" label="Cuerpo" v-model="body"
                                :rules="bodyRules"
                            />

                            <v-select :items="labels" filled label="Etiqueta" v-model="label">
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
    </Fullscreen>
</template>

<script lang="ts">
import {Component, Prop, Ref, Watch, Vue} from "vue-property-decorator";
import BlogLabel from "@/models/BlogLabel";
import BlogService from "@/services/BlogService";
import Fullscreen from "vue-fullscreen/src/component";
import Marked from 'marked'

@Component({components:{Fullscreen}})
export default class PostBlogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly labels!: BlogLabel[]
    @Ref() readonly markedId!: HTMLParagraphElement
    // body = "**Hola Mundo** que tal ```mola el markdown```"
    marking: boolean = true

    label: BlogLabel = new BlogLabel()
    loading: boolean = false
    title: string = ""
    body: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    bodyRules = [(v: string) => v && v.length > 0 ? true : "Cuerpo requerido"]
    fullscreen: boolean = true

    mounted() {
        this.markedId.innerHTML = Marked(this.body)
    }

    checkmarkdown() {
        this.markedId.innerHTML = Marked(this.body!)
    }

    @Watch('body')
    onBody() {
        if (this.marking) this.markedId.innerHTML = Marked(this.body)
    }

    fullscreenChange(fullscreen: boolean) {
        this.fullscreen = fullscreen
    }

    postBlog() {
        if (this.form.validate()) {
            BlogService.postBlog(this, this.title, this.body, this.label.id!)
        }
    }
}
</script>
<template>
    <Fullscreen ref="fullscreen" @change="fullscreenChange">
        <v-card height="100%">
            <v-toolbar color="secondary" dark>
                <v-toolbar-title>Crear Proyecto</v-toolbar-title>
                <v-spacer/>
                <v-btn icon @click="$refs['fullscreen'].toggle()">
                    <v-icon>{{ fullscreen ? "mdi-arrow-collapse" : "mdi-arrow-expand" }}</v-icon>
                </v-btn>
            </v-toolbar>
            <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="title" label="Titulo" :rules="titleRules" filled clearable />
                            <p ref="markedId">{{body}}</p>
                            <v-textarea filled auto-grow clearable clear-icon="mdi-close-circle" name="input-7-4" label="Cuerpo" v-model="body" :rules="bodyRules"/>
                            <v-file-input
                                filled v-model="bannerFile"
                                placeholder="Suba una banner"
                                label="image" append-icon="mdi-file-image"
                                prepend-icon="" :rules="bannerRules"
                            />
                            <v-btn block :loading="loading" :disabled="loading" color="success" @click="postProject">
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
import Fullscreen from "vue-fullscreen/src/component";
import Marked from 'marked'
import ProjectService from "@/services/ProjectService";

@Component({components:{Fullscreen}})
export default class PostProjectPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Ref() readonly markedId!: HTMLParagraphElement


    loading: boolean = false
    title: string = ""
    body: string = ""
    bannerFile: File | null = null
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]
    bodyRules = [(v: string) => v && v.length > 0 ? true : "Cuerpo requerido"]
    bannerRules = [(v: File) => v ? true : "Seleccione una Banner"]
    fullscreen: boolean = true

    mounted() {
        this.markedId.innerHTML = Marked(this.body)
    }

    @Watch('body')
    onBody() {
        this.markedId.innerHTML = Marked(this.body)
    }

    fullscreenChange(fullscreen: boolean) {
        this.fullscreen = fullscreen
    }

    postProject() {
        if (this.form.validate()) {
            ProjectService.postProject(this, this.title, this.body, this.bannerFile)
        }
    }
}
</script>
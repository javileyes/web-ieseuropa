<template>
    <v-dialog class="fill-height" v-model="dialog" persistent width="100%">
        <v-card v-if="project">
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
                                <div class="d-flex">
                                    <v-file-input hide-input small-chips style="margin: 0; padding: 0" v-model="documentFile"/>
                                    <v-text-field v-model="documentTitle" label="Titulo" clearable :disabled="!documentFile" style="margin: 0; padding: 0;" />
                                </div>
                                <v-btn text color="blue" @click="postProjectDocument" :disabled="!documentFile">Añadir Documentos</v-btn>
                            </div>
                            <v-container>
                                <v-row>
                                    <v-chip
                                        v-for="document in project.documents" :key="document.id" :href="document.url"
                                        target="_blank" class="ma-2 pa-2" color="#d1daf8" label close
                                        @click:close="deleteProjectDocument(project.id, document.id)"
                                    >
                                        <v-icon color="secondary" left>
                                            mdi-clipboard-text
                                        </v-icon>
                                        <span style="color:black; font-weight: bold">{{ document.description }}</span>
                                    </v-chip>
                                </v-row>
                            </v-container>

                            <v-divider class="mb-5"/>

                            <v-text-field v-model="project.title" :rules="titleRules" label="Titulo" filled clearable />
                            <p hidden ref="markedId">{{project.body}}</p>
                            <v-textarea @click="inicio" filled auto-grow clearable clear-icon="mdi-close-circle" name="input-7-4" label="Cuerpo" v-model="project.body" :rules="bodyRules"/>
                            <v-file-input
                                filled v-model="bannerFile"
                                placeholder="Suba una banner"
                                label="image" append-icon="mdi-file-image"
                                prepend-icon="" :rules="bannerRules"
                            />
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
import BlogService from "@/services/BlogService";
import Marked from "marked"
import Project from "@/models/Project";
import ProjectService from "@/services/ProjectService";

@Component
export default class PatchProjectDialogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly project!: Project
    @Prop() readonly refresh!: any
    @Prop() readonly switchDialog!: any
    @Prop() dialog!: boolean
    @Ref() readonly markedId!: HTMLParagraphElement
    loading: boolean = false
    documentFile: File | null = null
    bannerFile: File | null = null
    documentTitle: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Nombre requerido"]
    bodyRules = [(v: string) => v && v.length > 0 ? true : "Cuerpo requerido"]
    bannerRules = [(v: File) => v ? true : "Seleccione una Banner"]

    inicio() {
        this.markedId.removeAttribute("hidden")
        this.markedId.innerHTML = Marked(this.project.body!)
    }

    @Watch('project.body')
    onBody() {
        this.markedId.innerHTML = Marked(this.project.body!)
    }

    patchBlog() {
        if (this.form.validate()) {
            ProjectService.patchProject(this, this.project, this.bannerFile, this.project.id!!)
        }
    }

    deleteProjectDocument(id: number, documentId: number) {
        ProjectService.deleteProjectDocument(this, id, documentId)
    }

    postProjectDocument() {
        ProjectService.postProjectDocument(this, this.documentTitle, this.documentFile, this.project.id!!)
    }

    close() {
        this.refresh()
        this.switchDialog()
    }
}
</script>
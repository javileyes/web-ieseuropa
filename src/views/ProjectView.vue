<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">{{ project.title }}</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-container fluid grid-list-md>

                <v-row>
                    <v-col>
                        <v-card elevation="0">
                            <v-img style="background: #ffe3e0" contain
                                   max-height="200"
                                   lazy-src="/cargando-min.png"
                                   :src="project.banner.url"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-row>
                <v-col cols="12">
                    <v-card style="background: #fde2c2" class="dialogo-noticia mx-auto">
                        <v-card-title style="word-break:keep-all; color: blue" class="mt-4">{{ project.title }}</v-card-title>

<!--                        <v-card-subtitle class="pb-0">-->
<!--                            {{ date(project.createdAt).replace("$", "de") }}-->
<!--                        </v-card-subtitle>-->
                        <v-divider class="mx-4"/>
                        <v-card-text class="text--primary mt-4">
                            <div ref="markedId" style="text-align: justify"> {{project.body}} </div>
                            <!--                            <p style="text-align: justify" ref="markedId">{{project.body}}</p>-->
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-card style="background: #edf4fc">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Documentos</v-toolbar-title>
                        </v-toolbar>
                        <v-chip v-for="document in project.documents" :key="document.title" :href="document.url" target="_blank" class="ma-2 pa-2" color="#d1daf8" label>
                            <v-icon color="secondary" left>
                                mdi-clipboard-text
                            </v-icon>
                            <span style="color:black; font-weight: bold">{{ document.description }}</span>
                        </v-chip>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator"
import Project from "@/models/Project";
import Marked from 'marked'
import ProjectService from "@/services/ProjectService";

@Component
export default class ProjectView extends Vue {
    loading: boolean = false
    project: Project = new Project()
    @Ref() readonly markedId!: HTMLParagraphElement


    created() {
        ProjectService.getProject(this, parseInt(this.$route.params.id))
            .then(() => {
            this.markedId.innerHTML = Marked(this.project.body!)
        })

    }

    mounted() {
        this.markedId.innerHTML = Marked(this.project.body!) + "prueba"
    }

    // date(createdAt: string) {
    //     return format(new Date(createdAt), "dd $ MMMM, YYY", {locale: es})
    // }

    goingTo(dir : string) {
        window.open(dir, "_blank")
    }

}
</script>

<style>
.pointer {cursor: pointer;}
</style>
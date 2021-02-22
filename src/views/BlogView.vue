<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">{{ blog.title }}</h1>
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
                                   :src="blog.label.image.url"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-row>
                <v-col cols="12">
                    <v-card style="background: #fde2c2" class="dialogo-noticia mx-auto">
                        <v-card-subtitle style="text-align: end; color: purple">{{ blog.label.title }}</v-card-subtitle>
                        <v-card-title style="word-break:keep-all; color: blue" class="mt-4">{{ blog.title }}</v-card-title>

                        <v-card-subtitle class="pb-0">
                            {{ date(blog.createdAt).replace("$", "de") }}
                        </v-card-subtitle>
                        <v-divider class="mx-4"/>
                        <v-card-text class="text--primary mt-4">
                            <div ref="markedId" style="text-align: justify"> {{blog.body}} </div>
<!--                            <p style="text-align: justify" ref="markedId">{{blog.body}}</p>-->
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-layout row wrap v-if="blog.images.length">
                <v-flex xs12 md6 v-for="image in blog.images" :key="image.id">
                    <v-card class="ma-3" elevation="0">
                        <v-img class="pointer" style="background: #ffe3e0"
                               height="300"
                               lazy-src="/cargando-min.png"
                               :src="image.url"
                               @click="goingTo(image.url)"></v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator"
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService"
import {format} from "date-fns";
import {es} from "date-fns/locale";
import Marked from 'marked'

@Component
export default class BlogView extends Vue {
    loading: boolean = false
    blog: Blog = new Blog()
    @Ref() readonly markedId!: HTMLParagraphElement


    created() {
        BlogService.getBlog(this, parseInt(this.$route.params.id))
            .then(() => {
            this.markedId.innerHTML = Marked(this.blog.body!)
        })

    }

    // mounted() {
    //     this.markedId.innerHTML = Marked(this.blog.body!) + "prueba"
    // }

    date(createdAt: string) {
        return format(new Date(createdAt), "dd $ MMMM, YYY", {locale: es})
    }

    goingTo(dir : string) {
        window.open(dir, "_blank")
    }

}
</script>

<style>
.pointer {cursor: pointer;}
</style>
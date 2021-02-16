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
            <v-row align="center" justify="center" v-if="blog.images.length">
                <v-col cols>
                    <v-img class="dep_banner"
                           :src="blog.images[0].url"
                           lazy-src="https://picsum.photos/id/11/100/60"
                           max-height="300"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
            <v-row align="center" justify="center" v-else>
                <v-col cols>
                    <v-img class="dep_banner"
                           position="center"
                           :src="blog.label.image.url"
                           lazy-src="https://picsum.photos/id/11/100/60"
                           max-height="300"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-card style="background: #fde2c2" class="dialogo-noticia mx-auto">
                        <v-card-subtitle style="text-align: end; color: purple">{{ blog.label.title }}</v-card-subtitle>
                        <v-card-title style="color: blue" class="mt-4">{{ blog.title }}</v-card-title>

                        <v-card-subtitle class="pb-0">
                            {{ date(blog.createdAt).replace("$", "de") }}
                        </v-card-subtitle>
                        <v-divider class="mx-4"/>
                        <v-card-text class="text--primary mt-4">
                            <div> <span v-html="blog.body"></span></div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService"
import {format} from "date-fns";
import {es} from "date-fns/locale";

@Component
export default class BlogView extends Vue {
    loading: boolean = false
    blog: Blog = new Blog()


    created() {
        BlogService.getBlog(this, parseInt(this.$route.params.id))
    }

    date(createdAt: string) {
        return format(new Date(createdAt), "dd $ MMMM, YYY", {locale: es})
    }
}
</script>
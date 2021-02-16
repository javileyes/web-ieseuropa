<template>
    <v-container>
        <v-dialog class="fill-height" v-model="dialog" persistent max-width="600" @click:outside="close">
            <v-card style="background: #fde2c2" class="dialogo-noticia mx-auto">
                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-container fluid grid-list-md>
                    <v-layout row wrap v-if="blog.images.length">
                        <v-flex xs12 md6 v-for="image in blog.images" :key="image.id">
                            <v-card elevation="0">
                                <v-img :src="image.url"></v-img>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout v-else>
                        <v-flex>
                            <v-card elevation="0">
                                <v-img :src="blog.label.image.url"></v-img>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-subtitle style="text-align: end; color: purple">{{ blog.label.title }}</v-card-subtitle>
                <v-card-title style="color: blue" class="mt-4">{{ blog.title }}</v-card-title>

                <v-card-subtitle class="pb-0">
                    {{ date(blog.createdAt).replace("$", "de") }}
                </v-card-subtitle>
                <v-divider class="mx-4"/>
                <v-card-text class="text--primary mt-4">
                    <div> <span style="text-align: justify" v-html="blog.body"></span></div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="warning" text @click="close">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";
import {format} from "date-fns";
import {es} from "date-fns/locale";

@Component
export default class BlogDialogComponent extends Vue {
    @Prop() readonly blog!: Blog
    @Prop() readonly dialog!: boolean
    @Prop() readonly switchDialog!: any


    close() {
        this.switchDialog(this.blog)
    }

    date(createdAt: string) {
        return format(new Date(createdAt), "dd $ MMMM, YYY", {locale: es})
    }
}
</script>


<template>
    <div>
        <v-dialog class="fill-height" v-model="dialog" persistent max-width="600" @click:outside="close">
            <v-card class="mx-auto">
                <v-container fluid grid-list-md>
                    <v-layout row wrap v-if="blog.images.length">
                        <v-flex xs12 md6 v-for="image in blog.images" :key="image.id">
                            <v-card elevation="0">
                                <v-img :src="image.url" height="200px"></v-img>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout v-else>
                        <v-flex>
                            <v-card elevation="0">
                                <v-img :src="blog.label.image.url" height="200px"></v-img>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-title class="mt-4">{{ blog.title }}</v-card-title>

                <v-card-subtitle class="pb-0">
                    {{ blog.label.title }}
                </v-card-subtitle>

                <v-card-text class="text--primary mt-4" style="height: 60px">
                    <div>{{ blog.body }}</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="warning" text @click="close">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";

@Component
export default class BlogDialogComponent extends Vue {
    @Prop() readonly blog!: Blog
    @Prop() readonly dialog!: boolean
    @Prop() readonly switchDialog!: any

    close() {
        this.switchDialog(this.blog)
    }
}
</script>
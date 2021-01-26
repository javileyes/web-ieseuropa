<template>
    <v-card class="mx-auto" max-width="400">
        <v-img v-if="blog.images.length" class="white--text align-end" height="200px" :src="blog.images[0].url"/>
        <v-img v-else class="white--text align-end" height="200px" :src="blog.label.image.url"/>
        <v-card-title>{{ blog.title }}</v-card-title>

        <v-card-subtitle class="pb-0">
            {{ blog.createdAt }}
        </v-card-subtitle>

        <v-card-text class="text--primary" style="height: 60px">
            <div>{{ blog.body.slice(0, 62) }}...</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="warning" text @click="switchDialog(blog)">
                Ver mas
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";

@Component
export default class BlogPreviewComponent extends Vue {
    @Prop() readonly blog!: Blog
    @Prop() readonly switchDialog!: any


    created() {
        console.log(this.blog)
    }
}
</script>
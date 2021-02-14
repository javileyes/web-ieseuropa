<template>
    <v-card style="background: #edf4fc" class="mx-auto" max-width="400" height="400" @click="switchDialog(blog)">
        <v-img v-if="blog.images.length" class="white--text align-end" height="200px" :src="blog.images[0].url"/>
        <v-img v-else class="white--text align-end" height="200px" :src="blog.label.image.url"/>
        <v-card-subtitle style="text-align: end; color: purple; margin: -5px">{{ blog.label.title }}</v-card-subtitle>
        <v-card-title style="color: blue; margin-top: -20px; margin-bottom: -15px">{{ blog.title.slice(0, 62) }}</v-card-title>
        <v-divider class="mx-4"/>
        <v-card-subtitle class="pb-0">
            {{ date(blog.createdAt).replace("$", "de") }}
        </v-card-subtitle>

    </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";
import { format } from "date-fns";
import { es } from "date-fns/locale";

@Component
export default class BlogPreviewComponent extends Vue {
    @Prop() readonly blog!: Blog
    @Prop() readonly switchDialog!: any


    created() {
        console.log(this.blog)
    }

    date(createdAt: string) {
        return format(new Date(createdAt), "dd $ MMMM, YYY", {locale: es})
    }
}
</script>


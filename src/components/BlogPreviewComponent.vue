<template>
    <v-card style="background: #edf4fc" class="mx-auto" max-width="400" height="500">
        <v-img v-if="blog.images.length" class="white--text align-end" height="300px" :src="blog.images[0].url"/>
        <v-img v-else class="white--text align-end" height="300px" :src="blog.label.image.url"/>
<!--        <v-container justify="space-between">-->
        <v-card-subtitle style="text-align: end; color: purple">{{ blog.label.title }}</v-card-subtitle>
        <v-card-title style="color: blue">{{ blog.title }}</v-card-title>

        <v-card-subtitle class="pb-0">
            {{ date(blog.createdAt).replace("$", "de") }}
        </v-card-subtitle>
        <v-divider class="mx-4"/>
<!--        <v-card-text class="text&#45;&#45;primary" style="height: 60px">-->
<!--            <div><span v-html="blog.body.slice(0, 62)"></span>...</div>-->
<!--        </v-card-text>-->

<!--        <v-spacer></v-spacer>-->
        <v-card-actions>
            <v-btn color="warning" text @click="switchDialog(blog)">
                Ver mas
            </v-btn>
        </v-card-actions>
<!--        </v-container>-->
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


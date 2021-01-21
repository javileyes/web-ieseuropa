<template>
    <div class="home">
        <CarouselComponent />
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Ultimas Noticias</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="blog in blogs" :key="blog.id" sm="6" md="3">
                    <BlogPreviewComponent :blog="blog" :switch-dialog="switchDialog"/>
                </v-col>
            </v-row>
        </v-container>
        <BlogDialogComponent :switch-dialog="switchDialog" :blog="blog" :dialog="dialog"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CarouselComponent from "@/components/CarouselComponent.vue";
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";
import BlogPreviewComponent from "@/components/BlogPreviewComponent.vue";
import BlogDialogComponent from "@/components/BlogDialogComponent.vue";

@Component({components: {CarouselComponent, BlogPreviewComponent, BlogDialogComponent}})
export default class HomeView extends Vue {
    blogs: Blog[] = []
    dialog: boolean = false
    blog: Blog = new Blog()


    created() {
        this.refresh()
    }

    refresh() {
        BlogService.getBlogs(this, this.blogs)
    }

    switchDialog(blog: Blog) {
        this.blog = blog
        this.dialog ? this.dialog = false : this.dialog = true
    }

}
</script>

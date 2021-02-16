<template>
    <div class="home">
        <CarouselComponent />
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Últimas Noticias</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-container>
                        <v-data-iterator
                            :items="blogs" :loading="loading"
                            :show-select="false" :page.sync="page" @page-count="pageCount = $event"
                            :items-per-page="itemsPerPage" :server-items-length="totalItems"
                            :options.sync="options" loading-text="Cargando..." hide-default-footer
                        >
                            <template v-slot:default="{items}">
                                <v-row>
                                    <v-col v-for="blog in items" :key="blog.id" cols="12" sm="6" md="3">
                                        <BlogPreviewComponent :blog="blog" :switch-dialog="switchDialog"/>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:footer>
                                <v-divider/>
                                <v-row class="mt-2" align="center" justify="space-between">
                                    <v-btn class="ma-2" outlined tile color="secondary" light @click="$router.push('/noticias')">
                                        - MOSTRAR TODOS -
                                    </v-btn>

                                    <div class="text-center pt-2">
                                        <v-pagination v-model="page" :length="pageCount" color="secondary"/>
                                    </div>
                                </v-row>
                            </template>
                        </v-data-iterator>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
        <BlogDialogComponent :switch-dialog="switchDialog" :blog="blog" :dialog="dialog"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import CarouselComponent from "@/components/CarouselComponent.vue";
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";
import BlogPreviewComponent from "@/components/BlogPreviewComponent.vue";
import BlogDialogComponent from "@/components/BlogDialogComponent.vue";
import Options from "@/models/vue/Options";

@Component({components: {CarouselComponent, BlogPreviewComponent, BlogDialogComponent}})
export default class HomeView extends Vue {
    loading: boolean = false
    blogs: Blog[] = []
    dialog: boolean = false
    blog: Blog = new Blog()
    options: Options = new Options()
    page: number = 1
    pageCount: number = 0
    itemsPerPage: number = 4
    totalItems: number = 0


    @Watch("options")
    watchOptions() {
        BlogService.getBlogs(this, this.blogs, this.page - 1, this.itemsPerPage, null)
    }

    created() {
        this.watchOptions()
    }

    switchDialog(blog: Blog) {
        this.blog = blog
        this.dialog ? this.dialog = false : this.dialog = true
    }

}
</script>

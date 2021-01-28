<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-container>
                        <v-data-iterator
                            :items="blogs" :loading="loading"
                            :show-select="false" :page.sync="page" @page-count="pageCount = $event"
                            :items-per-page="itemsPerPage" :server-items-length="totalItems"
                            :options.sync="options" loading-text="Cargando..." hide-default-footer
                        >
                            <template v-slot:header>
                                <v-row class="mt-2" align="center" justify="space-between">
                                    <v-select :items="labels" v-model="label" label="Etiqueta" clearable @change="watchOptions" @click:clear="() => {label.id=null; watchOptions()}">
                                        <template v-slot:label>
                                            Todas
                                        </template>
                                        <template v-slot:item="{item}">
                                            {{item.title}}
                                        </template>
                                        <template v-slot:selection="{item}">
                                            {{item.title}}
                                        </template>
                                    </v-select>
                                    <div class="text-center pb-2">
                                        <v-pagination v-model="page" :length="pageCount" color="secondary"/>
                                    </div>
                                </v-row>
                                <v-divider/>
                            </template>

                            <template v-slot:default="{items}">
                                <v-row>
                                    <v-col v-for="blog in items" :key="blog.id" cols="12" sm="6" md="3">
                                        <BlogPreviewComponent :blog="blog" :switch-dialog="switchDialog"/>
                                    </v-col>
                                </v-row>
                            </template>

                            <template v-slot:footer>
                                <v-divider/>
                                <v-row class="mt-2" align="center" justify="end">
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
import {Component, Vue, Watch} from "vue-property-decorator";
import Blog from "@/models/Blog";
import Options from "@/models/vue/Options";
import BlogService from "@/services/BlogService";
import BlogPreviewComponent from "@/components/BlogPreviewComponent.vue";
import BlogDialogComponent from "@/components/BlogDialogComponent.vue";
import BlogLabelService from "@/services/BlogLabelService";
import BlogLabel from "@/models/BlogLabel";

@Component({components:{BlogPreviewComponent, BlogDialogComponent}})
export default class BlogsView extends Vue {
    loading: boolean = false
    blogs: Blog[] = []
    labels: Blog[] = []
    dialog: boolean = false
    blog: Blog = new Blog()
    label: BlogLabel = new BlogLabel()
    options: Options = new Options()
    page: number = 1
    pageCount: number = 0
    itemsPerPage: number = 8
    totalItems: number = 0


    @Watch("options")
    watchOptions() {
        BlogService.getBlogs(this, this.blogs, this.page - 1, this.itemsPerPage, this.label.id)
    }

    async created() {
        await this.refresh()
        this.watchQuery()
    }

    @Watch("$route.query.q")
    watchQuery() {
        if(this.$route.query.q) {
            this.labels.forEach(v => {
                if (v.title == this.$route.query.q) {
                    this.label = v
                }
            })
        }
        this.watchOptions()
    }

    refresh() {
        return BlogLabelService.getBlogLabels(this, this.labels)
    }

    switchDialog(blog: Blog) {
        this.blog = blog
        this.dialog ? this.dialog = false : this.dialog = true
    }
}
</script>
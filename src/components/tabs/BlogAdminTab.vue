<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="3">
                <PostBlogLabelPanel :refresh="refresh" />
            </v-col>
            <v-col cols="12" sm="12" md="9">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Etiquetas</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-data-table
                        :headers="headersLabels" :items="labels"
                        hide-default-footer :loading="loading"
                        loading-text="Loading... Please wait"
                    >
                        <template v-slot:item.image="{item}">
                            <v-btn class="ma-1" text icon color="success" :href="item.image.url" target="_blank">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:item.actions="{item}">
                            <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteLabel(item.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4">
                <PostBlogPanel :refresh="refresh" :labels="labels" />
            </v-col>
            <v-col cols="12" sm="12" md="8">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Noticias</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-card-text>
                        <v-data-table
                            :headers="headers" :items="blogs" :loading="loading"
                            :show-select="false" :page.sync="page" @page-count="pageCount = $event"
                            :items-per-page="itemsPerPage" :server-items-length="totalItems"
                            :options.sync="options" loading-text="Cargando..." hide-default-footer
                        >
                            <template v-slot:item.label="{item}">
                                <span>{{ item.label.title }}</span>
                            </template>
                            <template v-slot:item.actions="{item}">
                                <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteBlog(item.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>

                                <v-btn class="ma-1" text icon color="success" @click="switchDialog(item)">
                                    <v-icon>mdi-table-edit</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-pagination v-model="page" :length="pageCount" :total-visible="8"/>
                </v-card>
            </v-col>
            <PatchBlogDialogPanel :refresh="refresh" :blog="blog" :switchDialog="switchDialog" :dialog="dialog" :labels="labels" />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";
import BlogLabelService from "@/services/BlogLabelService";
import PostBlogPanel from "@/components/panel/PostBlogPanel.vue";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import PostBlogLabelPanel from "@/components/panel/PostBlogLabelPanel.vue";
import PatchBlogDialogPanel from "@/components/panel/PatchBlogDialogPanel.vue";
import Options from "@/models/vue/Options";

@Component({components: {
        PostBlogPanel,
        PostBlogLabelPanel,
        PatchBlogDialogPanel
}})
export default class BlogAdminTab extends Vue {
    loading: boolean = false
    blogs: Blog[] = []
    labels: Blog[] = []
    dialog: boolean = false
    blog: Blog = new Blog()
    options: Options = new Options()
    page: number = 1
    pageCount: number = 0
    itemsPerPage: number = 10
    totalItems: number = 0

    headers = [
        { text: "Titulo", value: "title" },
        { text: "Etiqueta", value: "label" },
        { text: "Fecha de creacion", value: "createdAt" },
        { text: "Acciones", value: "actions" }
    ]

    headersLabels = [
        { text: "Titulo", value: "title" },
        { text: "Banner", value: "image" },
        { text: "Acciones", value: "actions" }
    ]


    @Watch("options")
    watchOptions() {
        BlogService.getBlogs(this, this.blogs, this.page - 1, this.itemsPerPage, null)
    }

    created() {
        this.refresh()
    }

    refresh() {
        BlogService.getBlogs(this, this.blogs, this.page - 1, this.itemsPerPage, null)
        BlogLabelService.getBlogLabels(this, this.labels)
    }

    deleteBlog(id: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar esta etiqueta?",
            () => BlogService.deleteBlog(this, id)
        ))
    }

    deleteLabel(id: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar esta etiqueta?",
            () => BlogLabelService.deleteBlogLabel(this, id)
        ))
    }

    switchDialog(blog: Blog) {
        this.blog = {...blog}
        console.log(this.blog)
        this.dialog ? this.dialog = false : this.dialog = true
    }

}
</script>
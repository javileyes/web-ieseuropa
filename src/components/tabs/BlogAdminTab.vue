<template>
    <v-container>
        <v-row>
            <v-col cols="5">
                <v-card class="mb-6">
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
                            <v-btn x-small outlined color="success" :href="item.image.url" target="_blank">
                                Ver banner
                            </v-btn>
                        </template>
                        <template v-slot:item.actions="{item}">
                            <v-btn x-small outlined color="error" @click="deleteLabel(item.id)">
                                Eliminar
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>

                <v-card class="mb-6">
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Noticias</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-data-table
                        :headers="headers" :items="blogs"
                        hide-default-footer :loading="loading"
                        loading-text="Loading... Please wait"
                    >
                        <template v-slot:item.label="{item}">
                            <span>{{ item.label.title }}</span>
                        </template>
                        <template v-slot:item.actions="{item}">
                            <v-btn x-small outlined color="error" @click="deleteBlog(item.id)">
                                Eliminar
                            </v-btn>

                            <v-btn x-small outlined color="success" @click="switchDialog(item)">
                                Editar
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col>
                <PostBlogPanel :refresh="refresh" :labels="labels" />
            </v-col>
            <v-col>
                <PostBlogLabelPanel :refresh="refresh" />
                <PostBlogImagePanel :refresh="refresh" :blogs="blogs" />
            </v-col>
            <PatchBlogDialogPanel :refresh="refresh" :blog="blog" :switchDialog="switchDialog" :dialog="dialog" :labels="labels" />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Blog from "@/models/Blog";
import BlogService from "@/services/BlogService";
import BlogLabelService from "@/services/BlogLabelService";
import PostBlogPanel from "@/components/panel/PostBlogPanel.vue";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import PostBlogLabelPanel from "@/components/panel/PostBlogLabelPanel.vue";
import PostBlogImagePanel from "@/components/panel/PostBlogImagePanel.vue";
import PatchBlogDialogPanel from "@/components/panel/PatchBlogDialogPanel.vue";

@Component({components: {
        PostBlogPanel,
        PostBlogLabelPanel,
        PostBlogImagePanel,
        PatchBlogDialogPanel
}})
export default class BlogAdminTab extends Vue {
    loading: boolean = false
    blogs: Blog[] = []
    labels: Blog[] = []
    dialog: boolean = false
    blog: Blog = new Blog()

    headers = [
        { text: "Titulo", value: "title" },
        { text: "Etiqueta", value: "label" },
        { text: "Fecha de creacion", value: "date" },
        { text: "Acciones", value: "actions" }
    ]

    headersLabels = [
        { text: "Titulo", value: "title" },
        { text: "Banner", value: "image" },
        { text: "Acciones", value: "actions" }
    ]


    created() {
        this.refresh()
    }

    refresh() {
        BlogService.getBlogs(this, this.blogs)
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
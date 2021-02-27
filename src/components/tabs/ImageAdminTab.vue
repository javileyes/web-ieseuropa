<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Imagenes</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-data-table :headers="headers" :items="images">
                        <template v-slot:item.actions="{item}">
                            <v-btn class="ma-1" text icon color="success" :href="item.image.url" target="_blank">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteImage(item.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col>
                <PostImagePanel :refresh="refresh"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Image from "@/models/Image";
import ImageService from "@/services/ImageService";
import PostImagePanel from "@/components/panel/PostImagePanel.vue";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import ProjectService from "@/services/ProjectService";
@Component({
    components: {PostImagePanel}
})
export default class ImageAdminTab extends Vue {
    loading: boolean = false
    images: Image[] = []
    headers = [
        { text: 'Title', value: 'title' },
        { text: 'Key', value: 'key' },
        { text: 'Acciones', value: 'actions' }
    ]

    refresh() {
        ImageService.getImages(this, this.images)
    }

    created() {
        this.refresh()
    }

    deleteImage(id: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar esta imagen?",
            () => ImageService.deleteImage(this, id)
        ))
    }
}
</script>
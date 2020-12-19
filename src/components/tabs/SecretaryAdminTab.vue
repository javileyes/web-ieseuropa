<template>
    <v-container>
        <v-row>
            <v-col cols="5">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Secretaria Virtual</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-list>
                        <v-list-group v-for="category in categories" :key="category.id" prepend-icon="mdi-folder" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="category.title"/>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="(resource, index) in category.resources" :key="index" >
                                <v-icon class="mr-3">mdi-clipboard-text</v-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="resource.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-btn class="ma-1" text icon color="green lighten-2" @click="switchPatchResourceDialog(resource)">
                                    <v-icon>mdi-lead-pencil</v-icon>
                                </v-btn>
                                <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteResource(resource.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols>
                <PostResourceCategoryPanel :refresh="refresh"/>
                <PatchResourceCategoryPanel :categories="categories" :refresh="refresh" />
            </v-col>
            <v-col cols>
                <PostResourcePanel :categories="categories" :refresh="refresh" />
            </v-col>
            <PatchResourceDialogPanel :dialog="dialog" :resource="resourceDialog" :categories="categories" :refresh="refresh" :switchDialog="switchPatchResourceDialog"/>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";
import ResourceCategory from "@/models/ResourceCategory";
import Resource from "@/models/Resource";
import ResourceCategoryService from "@/services/ResourceCategoryService";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import ResourceService from "@/services/ResourceService";
import PatchResourceDialogPanel from "@/components/panel/PatchResourceDialogPanel.vue";
import PostResourceCategoryPanel from "@/components/panel/PostResourceCategoryPanel.vue";
import PatchResourceCategoryPanel from "@/components/panel/PatchResourceCategoryPanel.vue";
import PostResourcePanel from "@/components/panel/PostResourcePanel.vue";

@Component({components: {
        PatchResourceCategoryPanel,
        PostResourceCategoryPanel,
        PatchResourceDialogPanel,
        PostResourcePanel
}})
export default class SecretaryAdminTab extends Vue {
    categories: ResourceCategory[] = []
    dialog: boolean = false
    resourceDialog: Resource = new Resource()


    created() {
        this.refresh()
    }

    refresh() {
        ResourceCategoryService.getResourceCategories(this, this.categories)
    }

    deleteResource(id: string) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar este documento?",
            () => ResourceService.deleteResource(this, id)
        ))
    }

    switchPatchResourceDialog(resource: Resource) {
        this.resourceDialog = resource
        this.dialog ? this.dialog = false : this.dialog = true
    }
}
</script>
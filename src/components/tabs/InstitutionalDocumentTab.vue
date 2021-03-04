<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Documentos Institucionales</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-list>
                        <v-list-group v-for="category in categories" :key="category.id" prepend-icon="mdi-folder" no-action>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="category.title"/>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="(document, index) in category.institutionalDocuments" :key="index" >
                                <v-btn :href="document.document.url" color="accent" icon link target="_blank" dark>
                                    <v-icon left dark>
                                        mdi-clipboard-text
                                    </v-icon>
                                </v-btn>
                                <v-list-item-content>
                                    <v-list-item-title v-text="document.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-btn class="ma-1" text icon color="green lighten-2" @click="switchPatchDocumentDialog(document)">
                                    <v-icon>mdi-lead-pencil</v-icon>
                                </v-btn>
                                <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteInstitutionalDocument(document.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
                <PostInstitutionalDocumentCategoryPanel :refresh="refresh"/>
            </v-col>
            <v-col cols="12" sm="12" md="4">
                <PatchInstitutionalDocumentCategoryPanel :categories="categories" :refresh="refresh" />
            </v-col>
            <v-col cols="12" sm="12" md="8">
                <PostInstitutionalDocumentPanel :categories="categories" :refresh="refresh" />
            </v-col>
            <PatchInstitutionalDocumentDialogPanel :dialog="dialog" :institutionalDocument="institutionalDocumentDialog" :categories="categories" :refresh="refresh" :switchDialog="switchPatchDocumentDialog"/>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import InstitutionalDocumentCategory from "@/models/InstitutionalDocumentCategory";
import InstitutionalDocumentCategoryService from "@/services/InstitutionalDocumentCategoryService";
import InstitutionalDocumentService from "@/services/InstitutionalDocumentService";
import InstitutionalDocument from "@/models/InstitutionalDocument";
import PostInstitutionalDocumentCategoryPanel from "@/components/panel/PostInstitutionalDocumentCategoryPanel.vue";
import PatchInstitutionalDocumentCategoryPanel from "@/components/panel/PatchInstitutionalDocumentCategoryPanel.vue";
import PostInstitutionalDocumentPanel from "@/components/panel/PostInstitutionalDocumentPanel.vue";
import PatchInstitutionalDocumentDialogPanel from "@/components/panel/PatchInstitutionalDocumentDialogPanel.vue";

@Component({components: {
        PatchInstitutionalDocumentDialogPanel,
        PostInstitutionalDocumentPanel,
        PatchInstitutionalDocumentCategoryPanel,
        PostInstitutionalDocumentCategoryPanel
    }})
export default class InstitutionalDocumentTab extends Vue {
    loading: boolean = false
    categories: InstitutionalDocumentCategory[] = []
    dialog: boolean = false
    institutionalDocumentDialog: InstitutionalDocument = new InstitutionalDocument()


    created() {
        this.refresh()
    }

    refresh() {
        InstitutionalDocumentCategoryService.getInstitutionalDocumentCategories(this, this.categories)
    }

    deleteInstitutionalDocument(id: string) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar este documento?",
            () => InstitutionalDocumentService.deleteInstitutionalDocument(this, id)
        ))
    }

    switchPatchDocumentDialog(institutionalDocument: InstitutionalDocument) {
        this.institutionalDocumentDialog = {...institutionalDocument}
        this.dialog ? this.dialog = false : this.dialog = true
    }
}
</script>
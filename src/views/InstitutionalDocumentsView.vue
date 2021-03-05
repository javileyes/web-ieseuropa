<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Documentos Institucionales</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="8">
                    <v-card style="background: #edf4fc" class="ma-4" v-for="category in categories" :key="category.title">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title v-text="category.title" />
                        </v-toolbar>
                        <v-chip v-for="institutionalDocument in category.institutionalDocuments" :key="institutionalDocument.title" :href="institutionalDocument.document.url" target="_blank" class="ma-2 pa-2" color="#d1daf8" label>
                            <v-icon color="secondary" left>
                                mdi-clipboard-text
                            </v-icon>
                            <span style="color:black; font-weight: bold">{{ institutionalDocument.title }}</span>
                        </v-chip>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                    <v-card style="background: #edf4fc" :loading="loading" class="ma-4">
                        <template slot="progress">
                            <v-progress-linear :active="loading" color="deep-purple" height="10" indeterminate/>
                        </template>
                        <v-img height="250" src="@/assets/secretaria-banner.jpg"/>
                        <v-card-title>Documentos Institucionales</v-card-title>
                        <v-card-text>
                            <div>Descárgate tus documentos y agiliza tus gestiones</div>
                        </v-card-text>

                        <v-divider class="mx-4"/>

                        <v-img src="@/assets/posit.png" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import InstitutionalDocumentCategory from "@/models/InstitutionalDocumentCategory";
import InstitutionalDocumentCategoryService from "@/services/InstitutionalDocumentCategoryService";

@Component
export default class InstitutionalDocumentsView extends Vue {
    categories: InstitutionalDocumentCategory[] = []
    loading: boolean = false


    created() {
        InstitutionalDocumentCategoryService.getInstitutionalDocumentCategories(this, this.categories)
    }

}
</script>
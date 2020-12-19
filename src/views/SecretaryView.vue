<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="resourceCategoriesLoading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Secretaria Virtual</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-card class="ma-4" v-for="category in categories" :key="category.title">
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title v-text="category.title" />
                        </v-toolbar>
                        <v-chip v-for="resource in category.resources" :key="resource.title" class="ma-2 pa-2" color="success" label>
                            <v-btn :href="resource.document.url" icon link target="_blank" dark class="ma-1">
                                <v-icon left>
                                    mdi-clipboard-text
                                </v-icon>
                            </v-btn>
                            {{ resource.title }}
                        </v-chip>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card :loading="loading" class="ma-4">
                        <template slot="progress">
                            <v-progress-linear :active="resourceCategoriesLoading" color="deep-purple" height="10" indeterminate/>
                        </template>
                        <v-img height="250" src="@/assets/secretaria-banner.jpg"/>
                        <v-card-title>Secretaria virtual</v-card-title>
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
import ResourceCategory from "@/models/ResourceCategory";
import ResourceCategoryService from "@/services/ResourceCategoryService";

@Component
export default class SecretaryView extends Vue {
    categories: ResourceCategory[] = []
    resourceCategoriesLoading: boolean = false


    created() {
        ResourceCategoryService.getResourceCategories(this, this.categories)
    }

}
</script>
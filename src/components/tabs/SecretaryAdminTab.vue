<template>
    <v-container>
        <v-row>
            <v-col cols="5">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Secretaria Virtual</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="resourceCategoriesLoading" color="warning"/>
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
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Crear Categorias</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="resourceCategoryLoading" color="warning"/>
                    <v-form ref="form">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field v-model="categoryTitle" label="Titulo" filled clearable :rules="titleRules" />
                                    <v-btn block :loading="resourceCategoryLoading" :disabled="resourceCategoryLoading" color="success" @click="postCategory">
                                        Crear
                                        <template v-slot:loader>
                                            <span>Loading...</span>
                                        </template>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>
                <v-card class="mt-6">
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Editar Categorias</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="patchResourceCategoryLoading" color="warning"/>
                    <v-form ref="form">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-select :items="categories" v-model="resourceCategorySelect" filled label="Categoria" dense>
                                        <template v-slot:item="{item}">
                                            {{item.title}}
                                        </template>
                                        <template v-slot:selection="{item}">
                                            {{item.title}}
                                        </template>
                                    </v-select>
                                    <v-text-field v-model="patchResourceCategoryTitle" label="Nuevo Titulo" filled clearable :rules="titleRules" />
                                    <v-btn width="40%" class="mr-1" :loading="patchResourceCategoryLoading" :disabled="patchResourceCategoryLoading" color="error" @click="deleteCategory">
                                        Eliminar
                                        <template v-slot:loader>
                                            <span>Loading...</span>
                                        </template>
                                    </v-btn>
                                    <v-btn width="58%" :loading="patchResourceCategoryLoading" :disabled="patchResourceCategoryLoading" color="success" @click="patchCategory">
                                        Editar
                                        <template v-slot:loader>
                                            <span>Loading...</span>
                                        </template>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>
            </v-col>
            <v-col cols>
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Subir Documentos</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="resourceDocumentLoading" color="warning"/>
                    <v-form ref="form">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field v-model="resourceTitle" label="Nombre" :rules="titleRules" filled clearable />
                                    <v-file-input filled v-model="resourceFile" placeholder="Suba su documento" label="Documento" append-icon="mdi-paperclip" prepend-icon="" />

                                    <v-select :items="categories" v-model="resourceCategory" filled label="Categoria" dense>
                                        <template v-slot:item="{item}">
                                            {{item.title}}
                                        </template>
                                        <template v-slot:selection="{item}">
                                            {{item.title}}
                                        </template>
                                    </v-select>

                                    <v-btn block :loading="resourceDocumentLoading" :disabled="resourceDocumentLoading" color="success" @click="postResource">
                                        Guardar
                                        <template v-slot:loader>
                                            <span>Loading...</span>
                                        </template>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>
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

@Component({components: {PatchResourceDialogPanel}})
export default class SecretaryAdminTab extends Vue {
    @Ref() readonly form!: HTMLFontElement
    resourceFile: File | null = null
    resourceCategory: ResourceCategory = new ResourceCategory()
    resourceTitle: string = ""
    resourceDocumentLoading: boolean = false

    categoryTitle: string = ""
    resourceCategoryLoading: boolean = false

    resourceCategorySelect: ResourceCategory = new ResourceCategory()
    patchResourceCategoryTitle: string = ""
    patchResourceCategoryLoading: boolean = false

    categories: ResourceCategory[] = []
    resourceCategoriesLoading: boolean = false

    dialog: boolean = false
    resourceDialog: Resource = new Resource()

    titleRules = [
        (v: string) => v && v.length > 0 ? true : "Nombre requerido"
    ]


    created() {
        this.refresh()
    }

    refresh() {
        ResourceCategoryService.getResourceCategories(this, this.categories)
    }

    postCategory() {
        if (this.categoryTitle != "" && this.categoryTitle) {
            ResourceCategoryService.postResourceCategory(this, this.categoryTitle)
        }
    }

    patchCategory() {
        if (this.resourceCategorySelect.id && this.patchResourceCategoryTitle && this.patchResourceCategoryTitle != "") {
            ResourceCategoryService.patchResourceCategory(this, this.patchResourceCategoryTitle, this.resourceCategorySelect.id);
        }
    }

    deleteCategory() {
            getModule(DialogModule).showDialog(new Dialog(
                "Aviso",
                "¿Está seguro de eliminar esta categoria?",
                () => {
                    if (this.resourceCategorySelect.id) {
                        return ResourceCategoryService.deleteResourceCategory(this, this.resourceCategorySelect.id)
                    }
                }
            ))
    }

    postResource() {
        if (this.resourceCategory.id && this.resourceFile && this.resourceTitle != "") {
            ResourceService.postResource(this, this.resourceFile, this.resourceTitle, this.resourceCategory.id);
        }
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
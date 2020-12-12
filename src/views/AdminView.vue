<template>
    <div>
        <v-app-bar color="primary" dense dark>
            <v-toolbar-title>Admin Panel</v-toolbar-title>
            <v-spacer/>
            <v-menu left bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="logout">
                        <v-list-item-title>Cerrar Sesión</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-container>
            <v-row>
                <v-col cols="5">
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Secretaria Virtual</v-toolbar-title>
                        </v-toolbar>
                        <v-progress-linear :indeterminate="true" :active="resourceCategoriesLoading" color="warning"/>
                        <v-list>
                            <v-list-group v-for="category in categories" :key="category.title" prepend-icon="mdi-folder" no-action>
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
                    <v-card class="mb-6">
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
                    <v-card>
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
                                        <v-btn width="40%" class="mr-1" :loading="deleteResourceCategoryLoading" :disabled="deleteResourceCategoryLoading" color="error" @click="deleteCategory">
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
                <PatchResourceDialogComponent :dialog="dialog" :resource="resourceDialog" :categories="categories" :refresh="refresh" :switchDialog="switchPatchResourceDialog"/>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Ref} from "vue-property-decorator";
import LoginService from "@/services/LoginService";
import ResourceCategory from "@/models/ResourceCategory";
import ResourceService from "@/services/ResourceService";
import ResourceCategoryService from "@/services/ResourceCategoryService";
import Dialog from "@/models/vue/Dialog";
import DialogModule from "@/store/DialogModule";
import {getModule} from "vuex-module-decorators";
import Resource from "@/models/Resource";
import PatchResourceDialogComponent from "@/components/PatchResourceDialogComponent.vue";


@Component({components: {PatchResourceDialogComponent}})
export default class AdminView extends Vue {
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
        if (this.resourceCategorySelect && this.patchResourceCategoryTitle && this.patchResourceCategoryTitle != "") {
            ResourceCategoryService.patchResourceCategory(this, this.resourceCategorySelect, this.patchResourceCategoryTitle);
        }
    }

    deleteCategory() {
        if (this.resourceCategorySelect) {
            getModule(DialogModule).showDialog(new Dialog(
                "Aviso",
                "¿Está seguro de eliminar esta categoria?",
                () => ResourceCategoryService.deleteResourceCategory(this, this.resourceCategorySelect)
            ))
        }
    }

    postResource() {
        if (this.resourceCategory && this.resourceFile && this.resourceTitle != "") {
            ResourceService.postResource(this, this.resourceFile, this.resourceTitle, this.resourceCategory);
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

    logout() {
        LoginService.logout(this)
    }
}
</script>
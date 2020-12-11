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
                                        <v-list-item-title v-text="category.category"/>
                                    </v-list-item-content>
                                </template>

                                <v-list-item v-for="(resource, index) in category.resources" :key="index" >
                                    <v-icon class="mr-3">mdi-clipboard-text</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="resource.title"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-btn class="ma-1" text icon color="green lighten-2">
                                        <v-icon>mdi-lead-pencil</v-icon>
                                    </v-btn>
                                    <v-btn class="ma-1" text icon color="red lighten-2">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols>
                    <v-card class="mb-4">
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
                                                {{item.category}}
                                            </template>
                                            <template v-slot:selection="{item}">
                                                {{item.category}}
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
                                        <v-text-field v-model="resourceTitle" label="Nombre" filled clearable />
                                        <v-file-input filled v-model="resourceFile" placeholder="Suba su documento" label="Documento" append-icon="mdi-paperclip" prepend-icon="" />

                                        <v-select :items="categories" v-model="resourceCategory" filled label="Categoria" dense>
                                            <template v-slot:item="{item}">
                                                {{item.category}}
                                            </template>
                                            <template v-slot:selection="{item}">
                                                {{item.category}}
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
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Ref} from "vue-property-decorator";
import LoginService from "@/services/LoginService";
// eslint-disable-next-line no-unused-vars
import ResourceCategory from "@/models/ResourceCategory";
import ResourceService from "@/services/ResourceService";
import ResourceCategoryService from "@/services/ResourceCategoryService";

@Component
export default class AdminView extends Vue {
    @Ref() readonly form!: HTMLFontElement
    resourceFile: File | null = null
    resourceCategory?: ResourceCategory | undefined
    resourceTitle: string = ""
    resourceDocumentLoading: boolean = false

    categoryTitle: string = ""
    resourceCategoryLoading: boolean = false

    resourceCategorySelect?: ResourceCategory | undefined
    patchResourceCategoryTitle: string = ""
    patchResourceCategoryLoading: boolean = false
    deleteResourceCategoryLoading: boolean = false

    categories: ResourceCategory[] = []
    resourceCategoriesLoading: boolean = false

    titleRules = [
        (v: string) => v && v.length > 0 ? true : "Nombre requerido"
    ]


    created() {
        this.refresh()
    }

    refresh() {
        ResourceCategoryService.getResourceCategories(this, this.categories)
    }

    patchCategory() {
        if (this.resourceCategorySelect && this.patchResourceCategoryTitle && this.patchResourceCategoryTitle != "") {
            ResourceCategoryService.patchResourceCategory(this, this.resourceCategorySelect, this.patchResourceCategoryTitle);
        }
    }


    deleteCategory() {
        if (this.resourceCategorySelect) {
            ResourceCategoryService.deleteResourceCategory(this, this.resourceCategorySelect)
        }
    }

    postCategory() {
        if (this.categoryTitle != "" && this.categoryTitle) {
            ResourceCategoryService.postResourceCategory(this, this.categoryTitle)
        }
    }

    postResource() {
        if (this.resourceCategory && this.resourceFile && this.resourceTitle != "") {
            ResourceService.postResource(this, this.resourceFile, this.resourceTitle, this.resourceCategory);
        }
    }

    logout() {
        LoginService.logout(this)
    }
}
</script>
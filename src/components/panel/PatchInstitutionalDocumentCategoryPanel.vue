<template>
    <v-card>
        <v-toolbar color="secondary" dark>
            <v-toolbar-title>Editar Categorias</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col>
                        <v-select :items="categories" v-model="category" filled label="Categoria" dense>
                            <template v-slot:item="{item}">
                                {{item.title}}
                            </template>
                            <template v-slot:selection="{item}">
                                {{item.title}}
                            </template>
                        </v-select>
                        <v-text-field v-model="title" label="Nuevo Titulo" filled clearable :rules="titleRules" />
                        <v-btn width="40%" class="mr-1" :loading="loading" :disabled="loading" color="error" @click="deleteCategory">
                            Eliminar
                            <template v-slot:loader>
                                <span>Loading...</span>
                            </template>
                        </v-btn>
                        <v-btn width="58%" :loading="loading" :disabled="loading" color="success" @click="patchCategory">
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
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import InstitutionalDocumentCategory from "@/models/InstitutionalDocumentCategory";
import InstitutionalDocumentCategoryService from "@/services/InstitutionalDocumentCategoryService";

@Component
export default class PatchInstitutionalDocumentCategoryPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    @Prop() readonly categories!: InstitutionalDocumentCategory[]
    loading: boolean = false
    category: InstitutionalDocumentCategory = new InstitutionalDocumentCategory()
    title: string = ""
    titleRules = [(v: string) => v && v.length > 0 ? true : "Titulo requerido"]


    patchCategory() {
        if (this.form.validate() && this.category.id) {
            InstitutionalDocumentCategoryService.patchInstitutionalDocumentCategory(this, this.title, this.category.id);
        }
    }

    deleteCategory() {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar esta categoria?",
            () => {
                if (this.category.id) {
                    return InstitutionalDocumentCategoryService.deleteInstitutionalDocumentCategory(this, this.category.id)
                }
            }
        ))
    }
}
</script>
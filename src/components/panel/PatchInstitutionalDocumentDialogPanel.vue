<template>
    <v-dialog class="fill-height" v-model="dialog" persistent max-width="290">
        <v-card v-if="institutionalDocument">
            <v-toolbar flat dark color="secondary">
                <v-btn icon dark @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Editar Documento</v-toolbar-title>
            </v-toolbar>
            <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="institutionalDocument.title" :rules="titleRules" label="Titulo" filled clearable />
                            <v-file-input
                                filled v-model="documentFile"
                                placeholder="Suba su documento"
                                label="Documento"
                                append-icon="mdi-paperclip"
                                prepend-icon=""
                            />

                            <v-select :items="categories" v-model="category" filled label="Categoria" dense>
                                <template v-slot:item="{item}">
                                    {{item.title}}
                                </template>
                                <template v-slot:selection="{item}">
                                    {{item.title}}
                                </template>
                            </v-select>

                            <v-btn block :loading="loading" :disabled="loading" color="success" @click="patchInstitutionalDocument">
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
    </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Ref} from "vue-property-decorator";
import InstitutionalDocumentCategory from "@/models/InstitutionalDocumentCategory";
import InstitutionalDocument from "@/models/InstitutionalDocument";
import InstitutionalDocumentService from "@/services/InstitutionalDocumentService";

@Component
export default class PatchInstitutionalDocumentDialogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly categories!: InstitutionalDocumentCategory[]
    @Prop() readonly institutionalDocument!: InstitutionalDocument
    @Prop() readonly refresh!: any
    @Prop() readonly switchDialog!: any
    @Prop() dialog!: boolean
    loading: boolean = false
    documentFile: File | null = null
    category: InstitutionalDocumentCategory = new InstitutionalDocumentCategory()
    titleRules = [(v: string) => v && v.length > 0 ? true : "Nombre requerido"]


    patchInstitutionalDocument() {
        if (this.form.validate()) {
            InstitutionalDocumentService.patchInstitutionalDocument(this, this.institutionalDocument, this.documentFile, this.category.id)
        }
    }

    close() {
        this.refresh()
        this.switchDialog()
    }
}
</script>
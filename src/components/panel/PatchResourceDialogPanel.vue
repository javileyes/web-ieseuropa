<template>
    <v-dialog class="fill-height" v-model="dialog" persistent max-width="290">
        <v-card v-if="resource">
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
                            <v-text-field v-model="resource.title" :rules="titleRules" label="Titulo" filled clearable />
                            <v-file-input
                                filled v-model="resourceFile"
                                placeholder="Suba su documento"
                                label="Documento"
                                append-icon="mdi-paperclip"
                                prepend-icon=""
                                :rules="documentRules"
                            />

                            <v-select :items="categories" v-model="resourceCategory" filled label="Categoria" dense>
                                <template v-slot:item="{item}">
                                    {{item.title}}
                                </template>
                                <template v-slot:selection="{item}">
                                    {{item.title}}
                                </template>
                            </v-select>

                            <v-btn block :loading="loading" :disabled="loading" color="success" @click="patchResource">
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
import Resource from "../../models/Resource";
import ResourceCategory from "../../models/ResourceCategory";
import ResourceService from "@/services/ResourceService";

@Component
export default class PatchResourceDialogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly categories!: ResourceCategory[]
    @Prop() readonly resource!: Resource
    @Prop() readonly refresh!: any
    @Prop() readonly switchDialog!: any
    @Prop() dialog!: boolean
    loading: boolean = false
    resourceFile: File | null = null
    resourceCategory: ResourceCategory = new ResourceCategory()
    titleRules = [(v: string) => v && v.length > 0 ? true : "Nombre requerido"]
    documentRules = [(v: File) => v ? true : "Seleccione una Documento"]


    patchResource() {
        if (this.form.validate()) {
            ResourceService.patchResource(this, this.resource, this.resourceFile, this.resourceCategory.id)
        }
    }

    close() {
        this.refresh()
        this.switchDialog()
    }
}
</script>
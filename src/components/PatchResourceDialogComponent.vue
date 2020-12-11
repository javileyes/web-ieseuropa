<template>
    <v-dialog class="fill-height" v-model="dialog" persistent max-width="290">
        <v-card v-if="resource">
            <v-card-title class="headline">Editar Documento</v-card-title>
            <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="resource.title" :rules="titleRules" label="Nombre" filled clearable />
                            <v-file-input filled v-model="resourceFile" placeholder="Suba su documento" label="Documento" append-icon="mdi-paperclip" prepend-icon="" />

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
// eslint-disable-next-line no-unused-vars
import Resource from "../models/Resource";
import ResourceCategory from "../models/ResourceCategory";
import ResourceService from "@/services/ResourceService";

@Component
export default class PatchResourceDialogComponent extends Vue {
    @Ref() readonly form!: HTMLFontElement
    @Prop() readonly categories!: ResourceCategory[]
    @Prop() readonly resource!: Resource
    @Prop() readonly refresh!: any
    @Prop() readonly switch!: any
    @Prop() dialog!: boolean
    loading: boolean = false
    resourceFile!: File = null
    resourceCategory: ResourceCategory = new ResourceCategory()
    titleRules = [
        (v: string) => v && v.length > 0 ? true : "Nombre requerido"
    ]


    patchResource() {
        if (this.resource.title != "" || this.resourceFile || this.resourceCategory) {
            ResourceService.patchResource(this, this.resource, this.resourceFile, this.resourceCategory, this.dialog)
        }
    }
}
</script>
<template>
    <v-dialog class="fill-height" v-model="dialog" persistent width="100%">
        <v-card v-if="family">
            <v-toolbar flat dark color="secondary">
                <v-btn icon dark @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Editar Familia</v-toolbar-title>
            </v-toolbar>
            <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-space-between">
                                <v-file-input hide-input small-chips style="margin: 0; padding: 0" v-model="imageFile"/>
                                <v-btn text color="blue" @click="postFamilyImage" :disabled="!imageFile">Añadir Banners</v-btn>
                            </div>
                            <v-container>
                                <v-row>
                                    <v-col v-for="image in family.images" :key="image.id" cols="3">
                                        <v-img :src="image.url" class="grey lighten-2" height="116">
                                            <template v-slot:default>
                                                <div class="fill-height d-flex justify-center align-center">
                                                    <v-btn outlined fab color="error" @click="deleteFamilyImage(blog.id, image.id)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </div>
                                            </template>
                                        </v-img>
                                    </v-col>
                                </v-row>
                            </v-container>

                            <v-divider class="mb-5"/>

                            <v-text-field v-model="family.title" :rules="titleRules" label="Titulo" filled clearable />
                            <v-text-field v-model="family.url" label="Url" filled clearable :disabled="internal" />
                            <v-checkbox v-model="internal" label="Interno"/>
                            <p hidden ref="markedId">{{family.body}}</p>
                            <v-textarea
                                @click="inicio" filled auto-grow clearable
                                clear-icon="mdi-close-circle" name="input-7-4"
                                label="Cuerpo" v-model="family.body" :disabled="!internal"
                            />
                            <v-file-input
                                filled v-model="bannerFile"
                                placeholder="Suba una banner"
                                label="image" append-icon="mdi-file-image"
                                prepend-icon="" :disabled="!internal"
                            />
                            <v-btn block :loading="loading" :disabled="loading" color="success" @click="patchFamily">
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
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator"
import BlogService from "@/services/BlogService";
import Marked from "marked"
import Project from "@/models/Project";
import ProjectService from "@/services/ProjectService";
import Family from "@/models/Family";
import FamilyService from "@/services/FamilyService";

@Component
export default class PatchFamilyDialogPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly family!: Family
    @Prop() readonly refresh!: any
    @Prop() readonly switchDialog!: any
    @Prop() dialog!: boolean
    @Ref() readonly markedId!: HTMLParagraphElement
    loading: boolean = false
    internal: boolean = false
    bannerFile: File | null = null
    imageFile: File | null = null
    titleRules = [(v: string) => v && v.length > 0 ? true : "Nombre requerido"]

    inicio() {
        this.markedId.removeAttribute("hidden")
        this.markedId.innerHTML = Marked(this.family.body!)
    }

    @Watch('family.body')
    onBody() {
        this.markedId.innerHTML = Marked(this.family.body!)
    }

    patchFamily() {
        if (this.form.validate()) {
            FamilyService.patchFamily(this, this.family, this.bannerFile, this.family.id!)
        }
    }

    deleteFamilyImage(id: number, imageId: number) {
        FamilyService.deleteFamilyImage(this, id, imageId)
    }

    postFamilyImage() {
        FamilyService.postFamilyImage(this, this.imageFile, this.family.id!)
    }

    close() {
        this.refresh()
        this.switchDialog()
    }
}
</script>
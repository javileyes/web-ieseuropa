<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Familias</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-data-table :headers="headers" :items="families">
                        <template v-slot:item.url="{item}">
                            <v-btn
                                class="ma-1" text icon color="success"
                                :disabled="!item.url"
                                :href="item.url ? item.url : ''" target="_blank"
                            >
                                <v-icon>mdi-paperclip</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:item.banner="{item}">
                            <v-btn class="ma-1" text icon color="success" :disabled="!item.banner" :href="item.banner ? item.banner.url : ''" target="_blank">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:item.actions="{item}">
                            <v-btn class="ma-1" text icon color="success" @click="switchDialog(item)">
                                <v-icon>mdi-table-edit</v-icon>
                            </v-btn>
                            <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteFamily(item.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col>
                <PostFamilyPanel :refresh="refresh"/>
            </v-col>
            <PatchFamilyDialogPanel :family="family" :refresh="refresh" :dialog="dialog" :switchDialog="switchDialog"  />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Project from "@/models/Project";
import ProjectService from "@/services/ProjectService";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";
import PostProjectPanel from "@/components/panel/PostProjectPanel.vue";
import PatchProjectDialogPanel from "@/components/panel/PatchProjectDialogPanel.vue";
import Blog from "@/models/Blog";
import Family from "@/models/Family";
import FamilyService from "@/services/FamilyService";
import PostFamilyPanel from "@/components/panel/PostFamilyPanel.vue";
import PatchFamilyDialogPanel from "@/components/panel/PatchFamilyDialogPanel.vue";
@Component({
    components: {PatchFamilyDialogPanel, PostFamilyPanel}
})
export default class FamilyAdminTab extends Vue {
    loading: boolean = false
    dialog: boolean = false
    families: Family[] = []
    family: Family = new Family()
    headers = [
        { text: 'Title', value: 'title' },
        { text: 'Url', value: 'url' },
        { text: 'Banner', value: 'banner' },
        { text: 'Acciones', value: 'actions' }
    ]


    refresh() {
        FamilyService.getFamilies(this, this.families)
    }

    created() {
        this.refresh()
    }

    deleteFamily(id: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar la Familia?",
            () => FamilyService.deleteFamily(this, id)
        ))
    }

    switchDialog(family: Family) {
        this.family = {...family}
        this.dialog ? this.dialog = false : this.dialog = true
    }
}
</script>
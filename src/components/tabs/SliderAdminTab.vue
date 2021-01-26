<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Sliders</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                  <v-card-text>
                      <v-data-table :headers="headers" :items="sliders">
                          <template v-slot:item.url="{item}">
                              <v-btn text color="blue" @click="redirect(item.url)">
                                  Enlace
                              </v-btn>
                          </template>
                          <template v-slot:item.image="{item}">
                              <v-img :src="item.image.url" width="80"/>
                          </template>
                          <template v-slot:item.actions="{item}">
                              <v-btn class="ma-1" text icon color="success" :href="item.image.url" target="_blank">
                                  <v-icon>mdi-eye</v-icon>
                              </v-btn>
                              <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteSlider(item.id)">
                                  <v-icon>mdi-delete</v-icon>
                              </v-btn>
                          </template>
                      </v-data-table>
                  </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <PostSliderPanel :refresh="refresh"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Slider from "@/models/Slider";
import SliderService from "@/services/SliderService";
import PostSliderPanel from "@/components/panel/PostSliderPanel.vue";
import {getModule} from "vuex-module-decorators";
import DialogModule from "@/store/DialogModule";
import Dialog from "@/models/vue/Dialog";

@Component({components: {PostSliderPanel}})
export default class SliderAdminTab extends Vue {
    loading: boolean = false
    sliders: Slider[] = []
    headers = [
        { text: "Title", value: "title"},
        { text: "Image", value: "image"},
        { text: "Enlace", value: "url"},
        { text: "Acciones", value: "actions"}
    ]


    created() {
        this.refresh()
    }

    refresh() {
        SliderService.getSliders(this, this.sliders)
    }

    deleteSlider(id: number) {
        getModule(DialogModule).showDialog(new Dialog(
            "Aviso",
            "¿Está seguro de eliminar este slider?",
            () => SliderService.deleteSlider(this, id)
        ))
    }

    redirect(url: string) {
        window.location.href = url;
    }
}
</script>
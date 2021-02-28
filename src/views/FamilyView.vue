<template>
    <div>
        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">{{ family.title }}</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-container fluid grid-list-md>

                <v-row>
                    <v-col>
                        <v-card elevation="0">
                            <v-img style="background: #ffe3e0" contain
                                   max-height="200"
                                   lazy-src="/cargando-min.png"
                                   :src="family.banner.url"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-row>
                <v-col cols="12">
                    <v-card style="background: #fde2c2" class="dialogo-noticia mx-auto">
                        <v-card-title style="word-break:keep-all; color: blue" class="mt-4">{{ family.title }}</v-card-title>

                        <v-divider class="mx-4"/>
                        <v-card-text class="text--primary mt-4">
                            <div ref="markedId" style="text-align: justify"> {{family.body}} </div>
                            <!--                            <p style="text-align: justify" ref="markedId">{{family.body}}</p>-->
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-layout row wrap v-if="family.images.length">
                <v-flex xs12 md6 v-for="image in family.images" :key="image.id">
                    <v-card class="ma-3" elevation="0">
                        <v-img class="pointer" style="background: #ffe3e0"
                               height="300"
                               lazy-src="/cargando-min.png"
                               :src="image.url"
                               @click="goingTo(image.url)"></v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator"
import Marked from 'marked'
import Family from "@/models/Family";
import FamilyService from "@/services/FamilyService";

@Component
export default class FamilyView extends Vue {
    loading: boolean = false
    family: Family = new Family()
    @Ref() readonly markedId!: HTMLParagraphElement


    created() {
        FamilyService.getFamily(this, parseInt(this.$route.params.id))
            .then(() => {
                this.markedId.innerHTML = Marked(this.family.body!)
            })

    }

    mounted() {
        this.markedId.innerHTML = Marked(this.family.body!) + "prueba"
    }

    // date(createdAt: string) {
    //     return format(new Date(createdAt), "dd $ MMMM, YYY", {locale: es})
    // }

    goingTo(dir : string) {
        window.open(dir, "_blank")
    }

}
</script>

<style>
.pointer {cursor: pointer;}
</style>
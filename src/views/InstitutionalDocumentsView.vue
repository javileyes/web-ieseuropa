<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-container>
                    <v-row align="center" justify="center">
                        <v-col cols>
                            <div class="text-center">
                                <h1 class="mb-6">Documentos Institucionales</h1>
                            </div>
                        </v-col>
                    </v-row>


                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";



@Component
export default class InstitutionalDocumentsView extends Vue {
    loading: boolean = false
    page: number = 1
    pageCount: number = 0
    itemsPerPage: number = 8
    totalItems: number = 0
}
</script>
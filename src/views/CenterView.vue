<template>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-container>
                        <v-row align="center" justify="center">
                            <v-col cols>
                                <div class="text-center">
                                    <h1 class="mb-6">Centro</h1>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="12"  md="6">
                                <v-img height="250" src="@/assets/center/centro-exterior.jpg"/>
                            </v-col>
                            <v-col cols="12"  md="6">
                                <v-img height="250" src="@/assets/center/centro-interior.jpg"/>
                            </v-col>
                        </v-row>
                        <v-row class="mt-6">
                            <div >
                                <h3> El I.E.S. Europa es un centro de titularidad pública, dependiente de la Consejería de Educación, Formación y Empleo de la Región de Murcia,
                                    que educa a alumnos y alumnas de Educación Secundaria, Bachillerato y Ciclos Formativos.
                                </h3>
                                <br>
                                <h3>
                                Nuestro centro se encuentra en la ciudad de Aguilas, en la calle Miguel Angel Blanco.
                                </h3>
                                <br>
                                <h2>
                                Tf.: 968 449100  968 447535 – Fax: 968 447382 – Email: 30001230@educarm.es
                                </h2>
                            </div>
                        </v-row>

                    </v-container>
                </v-col>
            </v-row>
        </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";



@Component
export default class CenterView extends Vue {
    loading: boolean = false
    page: number = 1
    pageCount: number = 0
    itemsPerPage: number = 8
    totalItems: number = 0
}
</script>
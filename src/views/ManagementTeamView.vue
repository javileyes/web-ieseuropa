<template>
    <div>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols>
                    <div class="text-center">
                        <h1 class="mb-6">Contacto/Equipo Directivo</h1>
                        <v-divider class="mx-4"/>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Contacto</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text style="background: #edf4fc">
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-list style="background: #edf4fc">
                                            <v-list-item v-for="item in contactos1" :key="item.title">
                                                <v-list-item-content>
                                                    <div>
                                                        <b class="contacto">{{ item.title }}</b> <span class="contacto">{{ item.content }}</span>
                                                    </div>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                    <v-col>
                                        <v-list style="background: #edf4fc">
                                            <v-list-item v-for="item in contactos2" :key="item.title">
                                                <v-list-item-content>
                                                    <div>
                                                        <b class="contacto">{{ item.title }}</b> <span class="contacto">{{ item.content }}</span>
                                                    </div>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Equipo Directivo</v-toolbar-title>
                        </v-toolbar>
                        <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                        <v-data-table style="background: #edf4fc" disable-sort :headers="headers" :items="teachers" mobile-breakpoint="400" class="elevation-1" hide-default-footer/>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-toolbar color="secondary" dark>
                            <v-toolbar-title>Ubicación</v-toolbar-title>
                        </v-toolbar>
                        <div class="pa-4" style="background: #edf4fc">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12675.856540019335!2d-1.5725403!3d37.4143226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3b3a9262358db8f5!2sInstituto%20de%20Educaci%C3%B3n%20Secundaria%20Europa!5e0!3m2!1ses-419!2sve!4v1609864969942!5m2!1ses-419!2sve" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Config from "@/models/Config";
import ConfigService from "@/services/ConfigService";
import MetaInfo from "vue-meta"

@Component({
    metaInfo(): MetaInfo {
        return {
            title: "Equipo Directivo - IES Europa",
            htmlAttrs: {
                lang: 'es'
            },
            meta: [
                {charset: 'utf-8'},
                {
                    name: 'description',
                    content: 'El equipo directivo está siempre a disposición del profesorado, del alumnado, padres y de toda la comunidad educativa.'
                },
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {property: 'og:title', content: "Equipo Directivo - IES Europa"},
                {property: 'og:site_name', content: 'IES Europa'},
                {property: 'og:type', content: 'page'}
            ]
        };
    }
})
export default class ManagementTeamView extends Vue {
    teachers: any = []

    headers = [
        { text: 'Cargo', value: 'position' },
        { text: 'Nombre', value: 'name' },
        { text: 'Correo Electrónico', value: 'email' },
    ]

    contactos1 = [
        { title: "Horario del centro:", content: "De 8:30 a 14:40" },
        { title: "Horario de Secretaría:", content: "De 9:00 a 14:00" },
        { title: "Email centro:", content: "30001230@educarm.es" }
    ]

    contactos2 = [

        { title: "Cita previa:", content: "citapreviaieseuropa@gmail.com"},
        { title: "Teléfono:", content: "968 449100" },
        { title: "Fax:", content: "968 447382" }

    ]


    created() {
        this.refresh()
    }

    async refresh() {
        let list: Config[] = []
        await ConfigService.getConfigTeachers(this, list)
        list.forEach(v => {
            const values: any = v.value!.split(",")
            this.teachers.push({
                id: v.id,
                position: values[0],
                name: values[1],
                email: values[2]
            })
        })
    }
}
</script>


<style scoped>
.contacto {
    font-size: large !important;
}
@media (max-width: 1000px) {
    .contacto {
        font-size: medium !important;
    }
}
@media (max-width: 500px) {
    .contacto {
        font-size: small !important;
    }
}

</style>
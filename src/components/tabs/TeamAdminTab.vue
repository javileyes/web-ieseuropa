<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-toolbar color="secondary" dark>
                        <v-toolbar-title>Equipo directivo</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
                    <v-card-text>
                        <v-data-table :headers="headers" :items="teachers">
                            <template v-slot:item.actions="{item}">
                                <v-btn class="ma-1" text icon color="red lighten-2" @click="deleteConfigTeacher(item.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <PostConfigTeacherPanel :refresh="refresh"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ConfigService from "@/services/ConfigService";
import Config from "@/models/Config";
import PostConfigTeacherPanel from "@/components/panel/PostConfigTeacherPanel.vue";

@Component({components:{PostConfigTeacherPanel}})
export default class TeamAdminTab extends Vue {
    loading: boolean = false
    teachers: any = []
    headers = [
        { text: "Cargo", value: "position" },
        { text: "Nombre", value: "name" },
        { text: "Correo", value: "email" },
        { text: "Acciones", value: "actions" }
    ]


    created() {
        this.refresh()

    }

    async refresh() {
        let list: Config[] = []
        this.teachers = []
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

    deleteConfigTeacher(id: string) {
        ConfigService.deleteConfig(this, id)
    }
}
</script>
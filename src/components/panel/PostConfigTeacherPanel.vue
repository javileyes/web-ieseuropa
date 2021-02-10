<template>
   <v-card>
       <v-toolbar color="secondary" dark>
           <v-toolbar-title>Añadir Profesores (Equipo Directivo)</v-toolbar-title>
       </v-toolbar>
       <v-progress-linear :indeterminate="true" :active="loading" color="warning"/>
       <v-form ref="form">
           <v-container>
               <v-row>
                   <v-col>
                       <v-text-field v-model="fullName" label="Nombre" filled clearable :rules="titleRules" />
                       <v-text-field v-model="email" label="Email" filled clearable :rules="emailRules" />
                       <v-text-field v-model="position" label="Cargo" filled clearable :rules="titleRules" />
                       <v-text-field v-model="location" label="Orden" filled clearable />

                       <v-btn block :loading="loading" :disabled="loading" color="success" @click="postConfigTeacher">
                           Añadir
                           <template v-slot:loader>
                               <span>Loading...</span>
                           </template>
                       </v-btn>
                   </v-col>
               </v-row>
           </v-container>
       </v-form>
   </v-card>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from "vue-property-decorator";
import StringTool from "@/services/tool/StringTool";
import ConfigService from "@/services/ConfigService";

@Component
export default class PostConfigTeacherPanel extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Prop() readonly refresh!: any
    loading: boolean = false
    fullName: string = ""
    email: string = ""
    position: string = ""
    location!: number | undefined
    titleRules = [(v: string) => v && v.length > 0 ? true : "Este campo es requerido"]
    emailRules = [
        (v: string) => v.length > 0 ? true : "Email requerido",
        (v: string) => StringTool.validateEmail(v) ? true : "Email no es válido"
    ]

    postConfigTeacher() {
        ConfigService.postConfigTeacher(this, `${this.position},${this.fullName},${this.email}`, this.location)
    }
}
</script>
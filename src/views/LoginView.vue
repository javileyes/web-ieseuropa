<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                    </v-toolbar>
                    <v-progress-linear :indeterminate="true" :active="progress" color="warning"/>
                    <v-card-text>
                        <v-form ref="form">

                            <v-text-field
                                color="secondary"
                                @keydown.enter="$refs.loginButton.$el.click()"
                                v-model="email" label="Email" name="email"
                                prepend-icon="mdi-email" type="email"
                                :rules="emailRules" @click:prepend="developLogin()"
                            />

                            <v-text-field
                                color="secondary"
                                @keydown.enter="$refs.loginButton.$el.click()"
                                v-model="password" label="Contraseña"
                                name="password" prepend-icon="mdi-lock"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :rules="passwordRules"
                            />

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn ref="loginButton" :key="loginButtonReset" block dark color="primary" @click.once="login()">Acceder
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import {Component, Ref, Vue} from "vue-property-decorator";
import StringTool from "@/services/tool/StringTool";
import LoginService from "@/services/LoginService";
import SessionModule from "@/store/SessionModule";
import {getModule} from "vuex-module-decorators";
import SnackbarModule from "@/store/SnackbarModule";
import Session from "@/models/Session";
import ProfileTool from "@/services/tool/ProfileTool";

@Component
export default class LoginView extends Vue {
    @Ref() readonly form!: HTMLFormElement
    @Ref() readonly loginButton!: HTMLButtonElement
    sessionModule: SessionModule = getModule(SessionModule)
    email: string = ""
    password: string = ""
    showPassword: boolean = false
    progress: boolean = false
    loginButtonReset = 1

    emailRules = [
        (v: string) => v.length > 0 ? true : "Email requerido",
        (v: string) => StringTool.validateEmail(v) ? true : "Email no es válido"
    ]

    passwordRules = [
        (v: string) => v.length > 0 ? true : "Contraseña requerida"
    ]

    created() {
        if (ProfileTool.isDev()) {
            // this.email = "admin@ieseuropa.com"
            // this.password = "1234"
        }

        this.sessionModule.setSession(new Session());
        this.sessionModule.saveSession()
    }

    login() {
        if (this.form.validate()) {
            LoginService.postLogin(this, this.email, this.password, getModule(SnackbarModule), this.sessionModule)
        }
    }

    count: number = 0

    developLogin() {
        this.count++
        if (this.count >= 3) {
            this.email = "admin@ieseuropa.es"
            this.count = 0
        }
    }
}
</script>
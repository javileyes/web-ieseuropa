import ConstantTool from "@/services/tool/ConstantTool";
import LoginView from "@/views/LoginView.vue";
import SnackbarModule from "@/store/SnackbarModule";
import LoginResponse from "@/models/responses/LoginResponse";
import SessionModule from "@/store/SessionModule";
import {getModule} from "vuex-module-decorators";
import JsonTool from "@/services/tool/JsonTool";
import {Vue} from "vue-property-decorator";

export default class LoginService {


    static postLogin(component: LoginView, email: string, password: string, snackbarModule: SnackbarModule, sessionModule: SessionModule) {
        // @ts-ignore
        component.progress = true

        let formData: FormData = new FormData()
        formData.set("username", email)
        formData.set("password", password)

        component.axios.post(ConstantTool.BASE_URL + "/public/oauth/login", formData)
            .then(response => {
                let loginResponse: LoginResponse = JsonTool.jsonConvert.deserializeObject(response.data, LoginResponse)
                sessionModule.session.token = "Bearer " + loginResponse.oauth2AccessToken!.accessToken
                sessionModule.session.user = loginResponse.user!
                sessionModule.session.authorities = loginResponse.authorities!
                if (component.$route.query.redirect) {
                    component.$router.replace({path: component.$route.query.redirect as string});
                } else {
                    component.$router.replace({path: "/admin"})
                }
            })
            .catch(error => {
                snackbarModule.makeToast(error + "Usuario o contraseña no válidos")
            })
            .finally(() => {
                // @ts-ignore
                component.progress = false
                // @ts-ignore
                component.loginButtonReset++
            })
    }

    static logout(component: Vue) {
        let sessionModule: SessionModule = getModule(SessionModule)
        sessionModule.session.token = ""
        sessionModule.saveSession()
        component.$router.replace("/")
    }

}

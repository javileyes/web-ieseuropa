import PostSliderPanel from "@/components/panel/PostSliderPanel.vue";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import Config from "@/models/Config";
import JsonTool from "@/services/tool/JsonTool";
import Vue from "vue-property-decorator";

export default class ConfigService {
    static async postConfigTeacher(component: Vue, teacher: string) {
        // @ts-ignore
        component.loading = true

        let config = new Config()
        config.key = "teacher"
        config.value = teacher

        try {
            await component.axios.post(
                ConstantTool.BASE_URL + "/api/config/", config, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            getModule(SnackbarModule).makeToast("Se ha agregado un profesor correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // @ts-ignore
            component.form.reset()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al agregar un profesor")
            // @ts-ignore
            component.loading = false
        }

    }

    static async getConfigTeachers(component: Vue, teachers: Config[]) {
        (<any>component).loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/config/" + "teacher")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Config)
            teachers.splice(0, teachers.length)
            list.forEach(v => teachers.push(v));
            (<any>component).loading = false
        } catch (err) {
            (<any>component).loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se han podido obtener los profesores");
        }

    }

    static async deleteConfig(component: Vue, id: string) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/config/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado un elemento de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Error al eliminar una elemento")
        }
    }
}
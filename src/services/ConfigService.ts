import {Vue} from "vue-property-decorator";
import Config from "@/models/Config";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import {getModule} from "vuex-module-decorators";
import SnackbarModule from "@/store/SnackbarModule";

export default class ConfigService {
    static async getSocialMedia(component: Vue, socialMedia: Config[]) {
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/config/tag?tag=social_media")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Config)
            socialMedia.splice(0, socialMedia.length)
            list.forEach(p => socialMedia.push(p))
        } catch(err) {
            getModule(SnackbarModule).makeToast("No se han podido obtener los dibujos")
            console.log(err)
        }
    }
}
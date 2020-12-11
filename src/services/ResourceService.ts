import ConstantTool from "@/services/tool/ConstantTool";
import AdminView from "@/views/AdminView.vue";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import ResourceCategory from "@/models/ResourceCategory";

export default class ResourceService {
    static async postResource(component: AdminView, resourceFile: File | null, resourceTitle: string, category: ResourceCategory) {
        // @ts-ignore
        component.resourceDocumentLoading = true

        console.log(category)

        let formData = new FormData()
        if (resourceFile) {
            formData.set("document", resourceFile)
        }
        formData.set("title", resourceTitle)
        formData.set("resourceCategoryId", `${category.id}`)

        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + "/api/resource", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha guardado el documento correctamente!")
            // @ts-ignore
            component.resourceDocumentLoading = false
            component.refresh()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al guardar el documento")
            // @ts-ignore
            component.resourceDocumentLoading = false
        }

    }
}
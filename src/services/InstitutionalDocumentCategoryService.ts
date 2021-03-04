import Vue from "vue-property-decorator";
import ResourceCategory from "@/models/ResourceCategory";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import PostResourceCategoryPanel from "@/components/panel/PostResourceCategoryPanel.vue";
import PatchResourceCategoryPanel from "@/components/panel/PatchResourceCategoryPanel.vue";
import InstitutionalDocumentCategory from "@/models/InstitutionalDocumentCategory";


export default class InstitutionalDocumentCategoryService {


    static async getInstitutionalDocumentCategories(component: Vue, InstitutionalDocumentCategories: InstitutionalDocumentCategory[]) {
        (<any>component).loading = true

        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/institutional-document-category")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, InstitutionalDocumentCategory)
            InstitutionalDocumentCategories.splice(0, InstitutionalDocumentCategories.length)
            list.forEach(v => InstitutionalDocumentCategories.push(v));
            (<any>component).loading = false
        } catch (err) {
            (<any>component).loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se han podido obtener las categorias");
        }

    }

    static async postInstitutionalDocumentCategory(component: Vue, title: string) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/institutional-document-category", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha creado la categoria correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
        } catch(err) {
            getModule(SnackbarModule).makeToast("Error al crear la categoria")
            // @ts-ignore
            component.loading = false
            console.log(err)
        }
    }

    static async patchInstitutionalDocumentCategory(component: PatchResourceCategoryPanel, title: string, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/institutional-document-category/" + id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            getModule(SnackbarModule).makeToast("Se ha editado la categoria correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al editar la categoria")
        }
    }

    static async deleteInstitutionalDocumentCategory(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/institutional-document-category/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado la categoria de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar una categoria")
        }
    }

}
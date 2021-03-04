import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import Resource from "@/models/Resource";


export default class InstitutionalDocumentService {


    static async postInstitutionalDocument(component: Vue, documentFile: File | null, title: string, categoryId: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (documentFile) formData.set("documentFile", documentFile)
        formData.set("title", title)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/institutional-document-category/" + categoryId + "/institutional-document",
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            getModule(SnackbarModule).makeToast("Se ha guardado el documento correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // @ts-ignore
            component.form.reset()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al guardar el documento")
            // @ts-ignore
            component.loading = false
        }

    }

    static async patchInstitutionalDocument(component: Vue, resource: Resource, documentFile: File | null, categoryId: number | undefined) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()

        if (resource.title) formData.set("title", resource.title)
        if (documentFile) formData.set("documentFile", documentFile)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/institutional-document-category/" + categoryId + "/institutional-document/" + resource.id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // component.form.reset()
            // @ts-ignore
            component.switchDialog()
            getModule(SnackbarModule).makeToast("Se ha editado el documento correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.switchDialog()
            getModule(SnackbarModule).makeToast("Error al editar un documento")
        }
    }

    static async deleteInstitutionalDocument(component: Vue, id: string) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/institutional-document/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado el documento de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar una documento")
        }
    }
}
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import PatchResourceDialogComponent from "@/components/PatchResourceDialogComponent.vue";
import Resource from "@/models/Resource";
import SecretaryAdminTab from "@/components/tabs/SecretaryAdminTab.vue";


export default class ResourceService {
    static async postResource(component: SecretaryAdminTab, documentFile: File | null, title: string, categoryId: number) {
        // @ts-ignore
        component.resourceDocumentLoading = true

        let formData = new FormData()
        if (documentFile) formData.set("documentFile", documentFile)
        formData.set("title", title)
        formData.set("resourceCategoryId", `${categoryId}`)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/resource", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha guardado el documento correctamente!")
            // @ts-ignore
            component.resourceDocumentLoading = false
            // @ts-ignore
            component.refresh()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al guardar el documento")
            // @ts-ignore
            component.resourceDocumentLoading = false
        }

    }

    static async patchResource(component: PatchResourceDialogComponent, resource: Resource, documentFile: File | null, categoryId: number | undefined) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()

        if (resource.title) formData.set("title", resource.title)
        if (documentFile) formData.set("documentFile", documentFile)
        if (categoryId) formData.set("resourceCategoryId", `${categoryId}`)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/resource/" + resource.id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                });
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
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

    static async deleteResource(component: SecretaryAdminTab, id: string) {
        // @ts-ignore
        component.resourceCategoriesLoading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/resource/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.resourceCategoriesLoading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado el documento de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.resourceCategoriesLoading = false
            getModule(SnackbarModule).makeToast("Error al eliminar una documento")
        }
    }
}
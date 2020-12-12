import ConstantTool from "@/services/tool/ConstantTool";
import AdminView from "@/views/AdminView.vue";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import ResourceCategory from "@/models/ResourceCategory";
import PatchResourceDialogComponent from "@/components/PatchResourceDialogComponent.vue";
import Resource from "@/models/Resource";

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
            // @ts-ignore
            component.refresh()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al guardar el documento")
            // @ts-ignore
            component.resourceDocumentLoading = false
        }

    }

    static async patchResource(component: PatchResourceDialogComponent, resource: Resource, resourceFile: File | null, resourceCategory: ResourceCategory, dialog: boolean) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()

        if (resource.title) formData.set("title", resource.title)
        if (resourceFile) formData.set("document", resourceFile)
        if (resourceCategory) formData.set("resourceCategoryId", `${resourceCategory.id}`)

        try {
            const response = await component.axios.patch(ConstantTool.BASE_URL + "/api/resource/" + resource.id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                });
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // @ts-ignore
            component.switchDialog()
            getModule(SnackbarModule).makeToast("Se ha editado la categoria correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.switchDialog()
            getModule(SnackbarModule).makeToast("Error al editar la categoria")
        }
    }

    static async deleteResource(component: AdminView, id: string) {
        // @ts-ignore
        component.resourceCategoriesLoading = true

        try {
            const response = await component.axios.delete(ConstantTool.BASE_URL + "/api/resource/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            });
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
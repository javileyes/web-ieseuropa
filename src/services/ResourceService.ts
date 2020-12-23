import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import PatchResourceDialogComponent from "@/components/panel/PatchResourceDialogPanel.vue";
import Resource from "@/models/Resource";
import PostResourcePanel from "@/components/panel/PostResourcePanel.vue";


export default class ResourceService {
    static async postResource(component: PostResourcePanel, documentFile: File | null, title: string, categoryId: number | undefined, departmentId: number | undefined) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (documentFile) formData.set("documentFile", documentFile)
        if (categoryId) formData.set("resourceCategoryId", `${categoryId}`)
        if (departmentId) formData.set("departmentId", `${departmentId}`)
        formData.set("title", title)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/resource", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha guardado el documento correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            component.form.reset()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al guardar el documento")
            // @ts-ignore
            component.loading = false
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
            component.form.reset()
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

    static async deleteResource(component: Vue, id: string) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/resource/" + id, {
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
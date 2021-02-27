import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import JsonTool from "@/services/tool/JsonTool";
import Family from "@/models/Family";
import PatchFamilyDialogPanel from "@/components/panel/PatchFamilyDialogPanel.vue";

export default class FamilyService {
    static async postFamily(component: Vue, title: string, url: string | undefined , body: string | undefined, bannerFile: File | null) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        if (url) formData.set("url", url)
        if (body) formData.set("body", body)
        if (bannerFile) formData.set("bannerFile", bannerFile)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/family/", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha subido la familia correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // @ts-ignore
            component.form.reset()
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido subir la familia")
        }
    }

    static async patchFamily(component: Vue, request: Family, bannerFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (request.title) formData.set("title", request.title)
        if (request.body) formData.set("body", request.body)
        if (request.url) formData.set("body", request.url)
        if (bannerFile) formData.set("bannerFile", bannerFile)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/family/" + id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            getModule(SnackbarModule).makeToast("Se ha editado la familia correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido editar la familia")
        }
    }

    static async postFamilyImage(component: Vue, imageFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (imageFile) formData.set("imageFile", imageFile)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/family/" + id + "/image",
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            getModule(SnackbarModule).makeToast("Imagen añadida correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al añadir una imagen a la familia")
        }
    }

    static async deleteFamilyImage(component: PatchFamilyDialogPanel, id: number, imageId: number) {
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/family/" + id + "/image/" + imageId,
                {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            component.loading = false
            component.refresh()
            // @ts-ignore
            const items = component.family.images.filter(i => i.id !== imageId)
            component.family.images = items
            getModule(SnackbarModule).makeToast("Imagen eliminada correctamente!")
        } catch (err) {
            console.log(err)
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar la imagen")
        }
    }

    static async getFamilies(component: Vue, families: Family[]) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/family")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Family)
            families.splice(0, families.length)
            list.forEach(v => families.push(v))
            // @ts-ignore
            component.loading = false
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido obtener los proyectos");
        }
    }


    static async deleteFamily(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/family/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado la familia de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar la familia")
        }
    }
}
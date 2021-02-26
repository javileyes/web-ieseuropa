import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import JsonTool from "@/services/tool/JsonTool";
import Image from "@/models/Image";
import Blog from "@/models/Blog";

export default class ImageService {
    static async postImage(component: Vue, title: string, key: string, imageFile: File | null) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        formData.set("key", key)
        if (imageFile) formData.set("imageFile", imageFile)

        try {
            await component.axios.post(
                ConstantTool.BASE_URL + "/api/image/", formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            getModule(SnackbarModule).makeToast("Se ha guardado una imagen correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // @ts-ignore
            component.form.reset()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al guarder una imagen")
            // @ts-ignore
            component.loading = false
        }
    }

    static async getImages(component: Vue, images: Image[]) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/image")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Image)
            images.splice(0, images.length)
            list.forEach(v => images.push(v))
            // @ts-ignore
            component.loading = false
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido obtener las imagenes");
        }
    }

    static async getImageByKey(component: Vue, images: Image[], key: String) {
        (<any>component).loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/image/" + key)
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Image)
            images.splice(0, images.length)
            list.forEach(v => images.push(v));
            (<any>component).loading = false
        } catch (err) {
            (<any>component).loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se han podido obtener las imagenes");
        }

    }

    static async deleteImage(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/image/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado una imagen de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Error al eliminar una imagen")
        }
    }
}
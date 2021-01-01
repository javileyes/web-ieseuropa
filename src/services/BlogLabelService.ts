import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import {getModule} from "vuex-module-decorators";
import BlogLabel from "@/models/BlogLabel";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";

export default class BlogLabelService {


    static async getBlogLabels(component: Vue, labels: BlogLabel[]) {
        (<any>component).loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/blog-label")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, BlogLabel)
            labels.splice(0, labels.length)
            list.forEach(v => labels.push(v));
            (<any>component).loading = false
        } catch (err) {
            (<any>component).loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha obtener las etiquetas");
        }

    }

    static async postBlogLabel(component: Vue, title: string, imageFile: File | null) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        if (imageFile) formData.set("imageFile", imageFile)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/blog-label", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha creado la etiqueta correctamente!");
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
            getModule(SnackbarModule).makeToast("No se ha podido crear la etiqueta");
        }
    }

    static async deleteBlogLabel(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/blog-label/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado la etiqueta de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar una etiqueta")
        }
    }
}
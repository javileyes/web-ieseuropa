import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import {getModule} from "vuex-module-decorators";
import SnackbarModule from "@/store/SnackbarModule";
import Blog from "@/models/Blog";
import SessionModule from "@/store/SessionModule";
import PatchBlogDialogPanel from "@/components/panel/PatchBlogDialogPanel.vue";
import BlogView from "@/views/BlogView.vue";

export default class blogService {

    static async getBlogs(component: Vue, blogs: Blog[], page: number, size: number, labelId: number | null | undefined) {
        // console.log(labelId)
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/blog", {
                params: { page, size, labelId: labelId }
            })
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Blog)
            blogs.splice(0, blogs.length)
            list.forEach(v => blogs.push(v))
            // @ts-ignore
            component.totalItems = Number(response.headers["x-total-count"]);
            // @ts-ignore
            component.loading = false
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido obtener los blogs");
        }
    }

    static async getBlog(component: BlogView, id: number) {
        component.loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/blog/" + id)
            component.blog = JsonTool.jsonConvert.deserializeObject(response.data, Blog);
            component.loading = false
        } catch (err) {
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido obtener la noticia");
        }
    }

    static async postBlog(component: Vue, title: string, body: string, blogLabelId: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        formData.set("body", body)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/blog-label/" + blogLabelId + "/blog",
                formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha creado el blog correctamente!")
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
            getModule(SnackbarModule).makeToast("No se ha podido crear el blog")
        }
    }

    static async patchBlog(component: Vue, title: string | undefined, body: string | undefined, blogLabelId: number, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (title) formData.set("title", title)
        if (body) formData.set("body", body)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/blog-label/" + blogLabelId + "/blog/" + id,
                formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha editado el blog correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido editar el blog")
        }
    }

    static async postBlogImage(component: Vue, imageFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("imageFile", imageFile!)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/blog/" + id + "/image",
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
            getModule(SnackbarModule).makeToast("Error al añadir una imagen a la noticia")
        }
    }

    static async deleteBlogImage(component: PatchBlogDialogPanel, id: number, imageId: number) {
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/blog/" + id + "/image/" + imageId,
                {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            component.loading = false
            component.refresh()
            // @ts-ignore
            const items = component.blog.images.filter(i => i.id !== imageId)
            component.blog.images = items
            getModule(SnackbarModule).makeToast("Imagen eliminada correctamente!")
        } catch (err) {
            console.log(err)
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar la imagen")
        }
    }

    static async deleteBlog(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/blog/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado el blog de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar el blog")
        }
    }
}
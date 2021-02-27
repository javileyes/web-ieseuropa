import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import Project from "@/models/Project";
import JsonTool from "@/services/tool/JsonTool";
import PatchProjectDialogPanel from "@/components/panel/PatchProjectDialogPanel.vue";

export default class ProjectService {
    static async postProject(component: Vue, title: string, body: string, bannerFile: File | null) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        formData.set("body", body)
        if (bannerFile) formData.set("bannerFile", bannerFile)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/project/", formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            getModule(SnackbarModule).makeToast("Se ha subido el proyecto correctamente!")
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
            getModule(SnackbarModule).makeToast("No se ha podido subir el proyecto")
        }
    }

    static async patchProject(component: Vue, request: Project, bannerFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (request.title) formData.set("title", request.title)
        if (request.body) formData.set("body", request.body)
        if (bannerFile) formData.set("bannerFile", bannerFile)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/project/" + id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            getModule(SnackbarModule).makeToast("Se ha editado el proyecto correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido editar el proyecto")
        }
    }

    static async getProjects(component: Vue, projects: Project[]) {
        // @ts-ignore
        component.loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/project")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, Project)
            projects.splice(0, projects.length)
            list.forEach(v => projects.push(v))
            // @ts-ignore
            component.loading = false
        } catch (err) {
            // @ts-ignore
            component.loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se ha podido obtener los proyectos");
        }
    }

    static async postProjectDocument(component: Vue, title: string, documentFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        if(documentFile) formData.set("documentFile", documentFile)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/project/" + id + "/document",
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            // @ts-ignore
            component.form.reset()
            getModule(SnackbarModule).makeToast("Documento añadido correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al añadir el documento al departamento")
        }
    }

    static async deleteProjectDocument(component: PatchProjectDialogPanel, id: number, documentId: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/project/" + id + "/document/" + documentId,
                {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            const items = component.project.documents.filter(i => i.id !== documentId)
            // @ts-ignore
            component.project.documents = items
            // @ts-ignore
            component.refresh()
            getModule(SnackbarModule).makeToast("Documento eliminado correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar el documento")
        }
    }

    static async deleteProject(component: Vue, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/project/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado el proyecto de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar el proyecto")
        }
    }
}
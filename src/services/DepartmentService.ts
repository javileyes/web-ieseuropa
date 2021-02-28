import Vue from "vue-property-decorator";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import DepartmentContent from "@/models/DepartmentContent";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import PostDepartmentPanel from "@/components/panel/PostDepartmentPanel.vue";
import PatchDepartmentPanel from "@/components/panel/PatchDepartmentPanel.vue";
import DepartmentsModule from "@/store/DepartmentsModule";
import DepartmentView from "@/views/DepartmentView.vue";
import InformationSheetsAdminTab from "@/components/tabs/InformationSheetsAdminTab.vue";


export default class DepartmentService {


    static async getDepartments(component: Vue, departments: DepartmentContent[]) {
        (<any>component).loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/department")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, DepartmentContent)
            departments.splice(0, departments.length)
            list.forEach(v => departments.push(v))
            getModule(DepartmentsModule).setDepartments(departments);
            (<any>component).loading = false
        } catch (err) {
            (<any>component).loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se han podido obtener los departamentos");
        }

    }

    static async getDepartment(component: DepartmentView, id: number) {
        (<any>component).loading = true
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/department/" + id)
            // @ts-ignore
            component.department = JsonTool.jsonConvert.deserializeObject(response.data, DepartmentContent);
            (<any>component).loading = false
        } catch (err) {
            (<any>component).loading = false
            console.log(err)
            getModule(SnackbarModule).makeToast("No se han podido obtener el departamento");
        }
    }

    static async postDepartment(component: PostDepartmentPanel, title: string, imageFile: File | null, bannerFile: File | null) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        if (imageFile) { formData.set("imageFile", imageFile) }
        if (bannerFile) { formData.set("bannerFile", bannerFile) }

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/department", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha creado el departamento correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            component.form.reset()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al crear el departamento")
            // @ts-ignore
            component.loading = false
        }

    }

    static async patchDepartment(component: PatchDepartmentPanel, title: string, imageFile: File | null, bannerFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        if (title) formData.set("title", title)
        if (imageFile) formData.set("imageFile", imageFile)
        if (bannerFile) formData.set("bannerFile", bannerFile)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/department/" + id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            component.form.reset()
            getModule(SnackbarModule).makeToast("Se ha editado el departamento correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al editar el departamento")
        }
    }

    static async postDepartmentDocument(component: Vue, title: string, documentFile: File | null, id: number) {
        // @ts-ignore
        component.loading = true

        let formData = new FormData()
        formData.set("title", title)
        if(documentFile) formData.set("documentFile", documentFile)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/department/" + id + "/document",
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

    static async deleteDepartmentDocument(component: InformationSheetsAdminTab, id: number, documentId: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/department/" + id + "/document/" + documentId,
                {
                    headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false
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

    static async deleteDepartment(component: PatchDepartmentPanel, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/department/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado el departamento de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar un departamento")
        }
    }

}
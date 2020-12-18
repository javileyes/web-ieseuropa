import Vue from "vue-property-decorator";
import ResourceCategory from "@/models/ResourceCategory";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import SecretaryAdminTab from "@/components/tabs/SecretaryAdminTab.vue";


export default class ResourceCategoryService {

    static async getResourceCategories(component: Vue, resourceCategories: ResourceCategory[]) {
        (<any>component).resourceCategoriesLoading = true

        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + "/public/resource-category")
            let list = JsonTool.jsonConvert.deserializeArray(response.data, ResourceCategory)
            resourceCategories.splice(0, resourceCategories.length)
            list.forEach(v => resourceCategories.push(v));
            (<any>component).resourceCategoriesLoading = false
        } catch (err) {
            (<any>component).resourceCategoriesLoading = false
            console.log(err)
        }

    }

    static async postResourceCategory(component: SecretaryAdminTab, title: string) {
        // @ts-ignore
        component.resourceCategoryLoading = true

        let formData = new FormData()
        formData.set("title", title)

        try {
            await component.axios.post(ConstantTool.BASE_URL + "/api/resource-category", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha creado la categoria correctamente!")
            // @ts-ignore
            component.resourceCategoryLoading = false
            // @ts-ignore
            component.refresh()
        } catch(err) {
            getModule(SnackbarModule).makeToast("Error al crear la categoria")
            // @ts-ignore
            component.resourceCategoryLoading = false
            console.log(err)
        }
    }

    static async patchResourceCategory(component: SecretaryAdminTab, title: string, id: number) {
        // @ts-ignore
        component.patchResourceCategoryLoading = true

        let formData = new FormData()
        formData.set("title", title)

        try {
            await component.axios.patch(ConstantTool.BASE_URL + "/api/resource-category/" + id,
                formData, {
                    headers: {Authorization: getModule(SessionModule).session.token}
                })
            // @ts-ignore
            component.patchResourceCategoryLoading = false
            // @ts-ignore
            component.refresh()
            getModule(SnackbarModule).makeToast("Se ha editado la categoria correctamente!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.patchResourceCategoryLoading = false
            getModule(SnackbarModule).makeToast("Error al editar la categoria")
        }
    }

    static async deleteResourceCategory(component: SecretaryAdminTab, id: number) {
        // @ts-ignore
        component.patchResourceCategoryLoading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/resource-category/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.patchResourceCategoryLoading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado la categoria de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.deleteResourceCategoryLoading = false
            getModule(SnackbarModule).makeToast("Error al eliminar una categoria")
        }
    }

}
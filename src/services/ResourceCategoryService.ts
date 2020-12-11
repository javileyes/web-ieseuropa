import Vue from "vue-property-decorator";
import ResourceCategory from "@/models/ResourceCategory";
import ConstantTool from "@/services/tool/ConstantTool";
import JsonTool from "@/services/tool/JsonTool";
import AdminView from "@/views/AdminView.vue";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";

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

    static async postCategory(component: AdminView, categoryTitle: string) {
        component.resourceCategoryLoading = true

        let formData = new FormData()
        formData.set("name", categoryTitle)

        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + "/api/resource-category", formData, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha creado la categoria correctamente!")
            // @ts-ignore
            component.resourceCategoryLoading = false
            component.refresh()
        } catch(err) {
            getModule(SnackbarModule).makeToast("Error al crear la categoria")
            // @ts-ignore
            component.resourceCategoryLoading = false
            console.log(err)
        }
    }

}
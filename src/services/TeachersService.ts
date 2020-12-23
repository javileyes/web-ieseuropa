import DepartmentAdminTab from "@/components/tabs/DepartmentAdminTab.vue";
import ConstantTool from "@/services/tool/ConstantTool";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";
import SnackbarModule from "@/store/SnackbarModule";
import TeacherContent from "@/models/TeacherContent";
import PostTeacherPanel from "@/components/panel/PostTeacherPanel.vue";


export default class TeachersService {
    static async postTeacher(component: PostTeacherPanel, teacher: TeacherContent, departmentId: number) {
        // @ts-ignore
        component.loading = true

        try {
            const response = await component.axios.post(
                ConstantTool.BASE_URL + "/api/department/" + departmentId + "/teacher",
                teacher, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            getModule(SnackbarModule).makeToast("Se ha añadido el profesor correctamente!")
            // @ts-ignore
            component.loading = false
            // @ts-ignore
            component.refresh()
            component.form.reset()
        } catch(err) {
            console.log(err)
            getModule(SnackbarModule).makeToast("Error al añadir el profesor")
            // @ts-ignore
            component.loading = false
        }

    }

    static async deleteTeacher(component: DepartmentAdminTab, id: number) {
        // @ts-ignore
        component.loading = true

        try {
            await component.axios.delete(ConstantTool.BASE_URL + "/api/teacher/" + id, {
                headers: {Authorization: getModule(SessionModule).session.token}
            })
            // @ts-ignore
            component.loading = false;
            // @ts-ignore
            component.refresh();
            getModule(SnackbarModule).makeToast("Se ha eliminado un profesor de manera exitosa!")
        } catch (err) {
            console.log(err)
            // @ts-ignore
            component.loading = false
            getModule(SnackbarModule).makeToast("Error al eliminar una profesor")
        }
    }
}
import store from "@/store/store";
import {Action, Module, Mutation, MutationAction, VuexModule} from "vuex-module-decorators";
import DepartmentContent from "@/models/DepartmentContent";

@Module({dynamic: true, store, name: "DepartmentsModule"})
export default class DepartmentsModule extends VuexModule {
    departments: DepartmentContent[] = []

    @Mutation
    setDepartments(departments: DepartmentContent[]) {
        this.departments = departments
    }
}
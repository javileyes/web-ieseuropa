import {JsonObject, JsonProperty} from "json2typescript";
import Document from "@/models/Document";
import TeacherContent from "@/models/TeacherContent";
import Resource from "@/models/Resource";

@JsonObject("DepartmentContent")
export default class DepartmentContent {

    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("image", Document, true)
    image?: Document = undefined
    @JsonProperty("teachers", [TeacherContent], true)
    teachers?: TeacherContent[] = undefined
    @JsonProperty("resources", [Resource], true)
    resources?: Resource[] = undefined

}
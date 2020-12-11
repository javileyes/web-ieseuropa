import {JsonObject, JsonProperty} from "json2typescript";
import Resource from "@/models/Resource";


@JsonObject("ResourceCategory")
export default class ResourceCategory {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("category", String, true)
    category?: string = undefined
    @JsonProperty("resources", [Resource], true)
    resources?: Resource[] = undefined
}
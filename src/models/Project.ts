import {JsonObject, JsonProperty} from "json2typescript";
import Document from "@/models/Document";

@JsonObject("Project")
export default class Project {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("body", String, true)
    body?: string = undefined
    @JsonProperty("banner", Document, true)
    banner?: Document = undefined
    @JsonProperty("documents", [Document], true)
    documents?: Document[] = undefined
}
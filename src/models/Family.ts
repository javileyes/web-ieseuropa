import {JsonObject, JsonProperty} from "json2typescript";
import Document from "@/models/Document";

@JsonObject("Family")
export default class Family {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("url", String, true)
    url?: string = undefined
    @JsonProperty("body", String, true)
    body?: string = undefined
    @JsonProperty("banner", Document, true)
    banner?: Document = undefined
    @JsonProperty("images", [Document], true)
    images?: Document[] = undefined
}
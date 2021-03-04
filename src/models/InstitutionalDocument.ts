import {JsonObject, JsonProperty} from "json2typescript";
import Document from "@/models/Document";


@JsonObject("InstitutionalDocument")
export default class InstitutionalDocument {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("document", Document, true)
    document?: Document = undefined
}
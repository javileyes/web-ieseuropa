import {JsonObject, JsonProperty} from "json2typescript";
import InstitutionalDocument from "@/models/InstitutionalDocument";


@JsonObject("InstitutionalDocumentCategory")
export default class InstitutionalDocumentCategory {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("institutionalDocuments", [InstitutionalDocument], true)
    institutionalDocuments?: InstitutionalDocument[] = undefined
}
import {JsonObject, JsonProperty} from "json2typescript";
import Document from "@/models/Document";

@JsonObject("Image")
export default class Image {
    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("key", String, true)
    key?: string = undefined
    @JsonProperty("image", Document, true)
    image?: Document = undefined
}
import {JsonObject, JsonProperty} from "json2typescript";
import BlogLabel from "@/models/BlogLabel";
import Document from "@/models/Document";
import DateTimeConverter from "@/models/converters/DateTimeConverter";
import {DateTime} from "luxon";

@JsonObject("Blog")
export default class Blog {

    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("title", String, true)
    title?: string = undefined
    @JsonProperty("body", String, true)
    body?: string = undefined
    @JsonProperty("label", BlogLabel, true)
    label?: BlogLabel = undefined
    @JsonProperty("images", [Document], true)
    images?: Document[] = undefined
    @JsonProperty("createdAt", DateTimeConverter, true)
    createdAt?: DateTime = undefined

}
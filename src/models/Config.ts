import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Config")
export default class Config {

    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("key", String, true)
    key?: string = undefined
    @JsonProperty("value", String, true)
    value?: string = undefined
    @JsonProperty("url", String, true)
    url?: string = undefined
    @JsonProperty("tag", String, true)
    tag?: string = undefined
    @JsonProperty("meta", String, true)
    meta?: string = undefined

}
import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("TeacherContent")
export default class TeacherContent {

    @JsonProperty("id", Number, true)
    id?: number = undefined
    @JsonProperty("fullName", String, true)
    fullName?: string = undefined
    @JsonProperty("email", String, true)
    email?: string = undefined
    @JsonProperty("position", String, true)
    position?: string = undefined
    // TODO FIX subjects
    @JsonProperty("subjects", String, true)
    subject?: string = undefined
    @JsonProperty("schedule", String, true)
    schedule?: string = undefined
    @JsonProperty("location", Number, true)
    location?: number = undefined

}
<template>
    <div>
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(slide ,i) in slides" :key="i" :src="slide.image.url"/>
        </v-carousel>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Slider from "@/models/Slider";
import SliderService from "@/services/SliderService";

@Component
export default class CarouselComponent extends Vue {
    slides: Slider[] = []

    created() {
        SliderService.getSliders(this, this.slides)
    }
}
</script>
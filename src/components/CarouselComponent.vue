<template>
    <div>
        <v-carousel class="slider-r" cycle hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item contain v-for="(slide ,i) in slides" :key="i" :src="slide.image.url" target="_blank" :href="slide.url"/>
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

<style>
.slider-r {
    height: 500px!important;
}

@media (max-width: 1000px) {
    .slider-r {
        height: 250px!important;
    }

    .v-carousel__item {
        height: 250px!important;
    }
}
</style>
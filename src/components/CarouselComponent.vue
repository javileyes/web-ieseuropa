<template>
    <div>
        <v-carousel class="slider-r" cycle hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item class="pointer" contain v-for="(slide ,i) in slides" :key="i" eager>
            <v-img contain height="100%" :src="slide.image.url" @click="goingTo(slide.url)" eager/> </v-carousel-item>
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

    goingTo(dir : string) {
        if(dir) {
            if (dir.includes("http", 0)) window.open(dir, "_blank")
            else this.$router.push(dir)
        }
    }
}
</script>

<style>

.pointer {cursor: pointer;}

.slider-r {
    height: 500px!important;
}

@media (max-width: 1200px) {
    .slider-r {
        height: 400px!important;
    }

    .v-carousel__item {
        height: 400px!important;
    }
}

@media (max-width: 750px) {
    .slider-r {
        height: 350px!important;
    }

    .v-carousel__item {
        height: 350px!important;
    }
}

@media (max-width: 650px) {
    .slider-r {
        height: 250px!important;
    }

    .v-carousel__item {
        height: 250px!important;
    }
}


</style>
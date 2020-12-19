<template>
    <div class="home">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(slide ,i) in slides" :key="i" :src="slide.url"/>
        </v-carousel>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {

    slides = [
        { url: require("@/assets/galery/galery-1.jpg"), description: "" },
        { url: require("@/assets/galery/galery-2.jpg"), description: "" },
        { url: require("@/assets/galery/galery-3.jpg"), description: "" }
    ]
}
</script>

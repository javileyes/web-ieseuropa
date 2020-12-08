<template>
  <div>
    <v-app-bar color="#fcb69f" dark height="200px"
        src="http://web.murciaeduca.es/30001230/wp-content/uploads/sites/20/2020/07/prueba5.png"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgb(51 39 15 / 80%)"/>
      </template>

      <v-toolbar-title style="font-size: 44px;font-family: 'Abyssinica SIL'">IES Europa</v-toolbar-title>
    </v-app-bar>

    <v-bottom-navigation v-model="value" background-color="brown" dark>
      <v-menu open-on-hover offset-y bottom rounded="0" v-for="(button, index) in buttons" :key="index">

        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            {{ button.title }}
          </v-btn>
        </template>

        <v-list v-if="button.submenus">
          <v-list-item link v-for="(item, index) in button.submenus" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
  value: number = 1

  buttons = [
    {
      title: "Inicio",
      icon: "mdi-television-play",
      url: "/"
    },
    {
      title: "Departamentos",
      icon: "mdi-music-note",
      url: "/departamentos",
      submenus: [
        { title: 'Click Me' },
        { title: 'Click Me' }
      ]
    },
    {
      title: "Equipo Directivo",
      icon: "mdi-book",
      url: "/directiva",
      submenus: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    },
    {
      title: "Secretaria Virtual",
      icon: "mdi-image",
      url: "/secretaria",
      submenus: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }
  ]

  get color() {
    switch (this.value) {
      case 0: return 'blue-grey'
      case 1: return 'teal'
      case 2: return 'brown'
      case 3: return 'indigo'
      default: return 'blue-grey'
    }
  }
}
</script>
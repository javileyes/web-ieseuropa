import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        options: {
            customProperties: true,
        },
        themes:{
            light: {
                primary: '#99090C',
                secondary: '#B53B3D',
                accent: '#454545',
                error: '#d9534f',
                info: '#3da9de',
                success: '#509950',
                warning: '#f0ad4e'
            },
            dark: {
                primary: '#99090C',
                secondary: '#B53B3D',
                accent: '#a49200',
                error: '#d9534f',
                info: '#3da9de',
                success: '#00b879',
                warning: '#f0ad4e'
            }
        }
    }
});
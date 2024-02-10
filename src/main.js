import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {store} from "@/store/store";
import {pink, darkBlue} from "@/themes";


const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi
        }
    },
    components,
    directives,
    theme: {
        defaultTheme: "darkBlue",
        themes: {
            pink,
            darkBlue
        },
    }
});

createApp(App)
    .use(vuetify)
    .use(router)
    .use(store)
    .mount('#app')


window.setInterval(() => {
    store.commit("tick");
}, 1000);

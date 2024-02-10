import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, md} from 'vuetify/iconsets/md'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {store} from "@/store/store";
import {pink, darkBlue} from "@/themes";


const vuetify = createVuetify({
    icons: {
        defaultSet: "md",
        aliases,
        sets: {
            md
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

import './assets/main.css'

import 'bootstrap/js/dist/button'
import 'bootstrap/js/dist/modal'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import {dom, library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import vSelect from 'vue-select';
import InputComp from '@/components/InputComp.vue';

library.add(fas, far, fab);
dom.watch();


const app = createApp(App);

// DO NOT USE, HACK TO LOAD THIS COMPONENT ONCE, USE OWN SelectComp
app.component('SelectComp',vSelect);
// DO NOT USE, HACK TO LOAD THIS COMPONENT ONCE, USE OWN SelectComp

app.component('InputComp', InputComp);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount('#fakestore');

import {
    createApp
} from 'vue'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Cookies from "js-cookie";

// DEFAULT HEADERS CONFIG 
axios.defaults.headers.common["token"] = Cookies.get("token");

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
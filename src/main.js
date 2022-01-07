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


// for (let index = 0; index < 100; index++) {
//     AsyncLocalStorage.clear();

// AsyncLocalStorage.setItem(`hello${index}`, ["world", "foo", "bar", "baz"]);
// AsyncLocalStorage.getItem(`hello${index}`).then(r => console.log(r));
// }
// const helloWorld = "HelloWorld";
// let request = window.indexedDB.open(helloWorld, 1),
//     database, tx, dbStore, index;

// request.onupgradeneeded = () => {
//     let db = request.result,
//         store = db.createObjectStore(helloWorld, {
//             keyPath: "hID"
//         }),
//         index = store.createIndex("foo", "foo", {
//             unique: false
//         });
//     index;
// }

// request.addEventListener("error", e => {
//     console.log(`Error : ${e.target.errorCode}`);
// });
// request.onsuccess = e => {
//     console.log(e.target);
//     database = e.target.result;
//     tx = database.transaction(helloWorld, "readwrite");
//     store = tx.createObjectStore(helloWorld);
//     index = store.index("foo");

//     database.onerror = e => {
//         console.log(`Error : ${e.target.errorCode}`);
//     }

//     store.put({
//         hID: 1,
//         foo: "bar",
//     });

//     tx.oncomplete = () => database.close();
// };
// database, tx, dbStore, index;

// window.caches.open("HelloWorld").then(cache => {
//     console.log(cache);

//     cache.add("/", {
//         name: "Rick",
//         lastName: "grimes"
//     }).then(() => console.log("character added"));
// })

// DEFAULT HEADERS CONFIG 
axios.defaults.headers.common["token"] = Cookies.get("token");

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
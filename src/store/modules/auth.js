import axios from 'axios';
import Cookies from "js-cookie";
const apiURL = process.env.VUE_APP_API_URL;


export default {
    namespaced: true,
    state: () => ({
        userCredentials: JSON.parse(sessionStorage.getItem("userCredentials")),
    }),
    getters: {
        userCredentials(state) {
            if (typeof state.userCredentials == "object" && state.userCredentials) {
                return state.userCredentials;
            } else {
                return null;
            }
        },
    },
    mutations: {
        userCredentials(state, newValue) {
            newValue = (newValue) ? newValue : null;
            sessionStorage.setItem("userCredentials", JSON.stringify(newValue));
            state.userCredentials = newValue;
        },
        userToken(state, newValue) {
            newValue ? Cookies.set("token", newValue, {
                    "expires": 1,
                    sameSite: 'Strict',
                    secure: true
                }) :
                Cookies.remove("token", {
                    "expires": 1,
                    sameSite: 'Strict',
                    secure: true
                });
        }
    },
    actions: {
        async login(store, {
            email,
            password
        }) {
            try {
                const response = await axios.post(`${apiURL}login`, {
                    email,
                    password
                });
                store.commit("userCredentials", response.data.user);
                store.commit("userToken", response.data.token);
                return response;
            } catch (err) {
                store.commit("userCredentials", null);
                store.commit("userToken", null);

                return err.response;
            }
        },
        async register(store, {
            email,
            name,
            password,
            password_confirmation
        }) {
            try {
                const response = await axios.post(`${apiURL}register`, {
                    email,
                    name,
                    password,
                    password_confirmation
                });
                store.commit("userCredentials", response.data.user);
                store.commit("userToken", response.data.token);
                return response;
            } catch (err) {
                store.commit("userCredentials", null);
                store.commit("userToken", null);
                return err.response;
            }
        },
        async isAuthenticated(store) {
            try {
                const response = await axios.get(`${apiURL}isAuthenticated`);
                store.commit("userCredentials", response.data.user);
                store.commit("userToken", response.data.token)
                return true;
            } catch (error) {
                store.commit("userCredentials", null);
                store.commit("userToken", null);
                return false;
            }
        },
        async logout(store) {
            const deleteCredentials = () => {
                store.commit("userCredentials", null);
                store.commit("userToken", null);
            };
            try {
                const response = await axios.get(`${apiURL}logout`);
                deleteCredentials();
                return response;
            } catch (error) {
                deleteCredentials()
                return error.response;
            }
        },
    },
    modules: {}
}
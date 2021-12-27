import axios from 'axios';
import Cookies from "js-cookie";
const apiURL = process.env.VUE_APP_API_URL;


export default {
    namespaced: true,
    state: () => ({
        userCredentials: JSON.parse(localStorage.getItem("userCredentials")),
        userToken: Cookies.get("token"),
    }),
    getters: {
        userCredentials(state) {
            if (typeof state.userCredentials == "object" && state.userCredentials) {
                return state.userCredentials;
            } else {
                return null;
            }
        },
        userToken(state) {
            const token = state.userToken ? state.userToken : Cookies.get("token");
            return token ? token : null;
        }
    },
    mutations: {
        userCredentials(state, newValue) {
            newValue = (newValue) ? newValue : null;
            localStorage.setItem("userCredentials", JSON.stringify(newValue));
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
            state.userToken = newValue;
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
        async isAuthenticated(store, token = null) {
            token = !token ? store.getters.userToken : token;
            try {
                const response = await axios.get(`${apiURL}isAuthenticated`, {
                    headers: {
                        "token": token
                    }
                });
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
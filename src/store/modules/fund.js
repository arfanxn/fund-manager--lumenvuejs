import axios from 'axios';
const apiURL = process.env.VUE_APP_API_URL;


export default {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        async myFund() {
            try {
                const response = await axios.get(apiURL + "fund/myfund");
                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
}
import axios from 'axios';
const apiURL = process.env.VUE_APP_API_URL;


export default {
    namespaced: true,
    state: () => ({
        myFund: {},
    }),
    getters: {
        myFund: state => (state.myFund),
    },
    mutations: {
        myFund(state, newValue) {
            state.myFund = newValue;
        }
    },
    actions: {
        async myFund(store) {
            try {
                const response = await axios.get(apiURL + "fund/show");
                store.commit("myFund", response.data.fund);
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async update(store, balance) {
            try {
                const response = await axios.put(apiURL + "fund/update", {
                    "balance": balance
                });
                store.commit("myFund", response.data.updated_fund);
                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
}
import axios from 'axios';
const apiURL = process.env.VUE_APP_API_URL + "transaction/";

export default {
    namespaced: true,
    state: () => ({
        transactions: []
    }),
    getters: {
        transactions: state => state.transactions,
    },
    mutations: {
        transactions(state, newValue) {
            state.transactions = newValue;
        },
        unshiftTransactionsData(state, newValue) {
            (state.transactions.data).unshift(newValue);
        },
        updateTransactionsDataByID(state, {
            tx_id,
            transaction_id,
            newValue
        }) {
            tx_id = tx_id ? tx_id : transaction_id;
            (state.transactions.data).forEach((tx, index) => {
                if (tx.id == tx_id) {
                    (state.transactions.data)[index] = newValue;
                    return;
                }
            });
        },
        deleteTransactionsDataByID(state, tx_id) {
            let index = null;
            (state.transactions.data).forEach((tx, i) => {
                if (tx.id == tx_id) {
                    index = i;
                    return;
                }
            });
            (state.transactions.data).splice(index, 1);
        }
    },
    actions: {
        async index(store, params = null) {
            params = params ? `/?${params}` : "";
            try {
                const response = await axios.get(apiURL + "index" + params);
                store.commit("transactions", response.data.transactions)
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async store(store, {
            amount,
            note,
            type,
            date
        }) {
            try {
                const response = await axios.post(`${apiURL}store`, {
                    amount,
                    type,
                    note,
                    date
                });
                store.commit("unshiftTransactionsData", response.data.transaction);
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async update(store, {
            tx_id,
            transaction
        }) {
            tx_id = tx_id ? tx_id : transaction.id;
            try {
                console.log(transaction);
                const response = await axios.put(`${apiURL}update/`, {
                    "id": tx_id,
                    "amount": transaction.amount,
                    "type": transaction.type,
                    "note": transaction.note,
                    "date": transaction.date,
                });
                store.commit("updateTransactionsDataByID", {
                    'tx_id': tx_id,
                    "newValue": response.data.transaction
                });
                console.log(response.data);
                return response;
            } catch (error) {
                return error.response;
            }
        },
        async destroy(store, tx_id) {
            try {
                const response = await axios.delete(`${apiURL}destroy/?transaction_id=${tx_id}`);
                store.commit("deleteTransactionsDataByID", tx_id);
                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
}
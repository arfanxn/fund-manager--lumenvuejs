import axios from 'axios';
import AsyncLocalStorage from '../../services/AsyncLocalStorage';
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
            AsyncLocalStorage.setItem("transactions", (state.transactions));
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
                    AsyncLocalStorage.setItem("transactions", (state.transactions));
                    console.log(state.transactions.data);
                    AsyncLocalStorage.getItem("transactions").then(r => console.log(r));
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
            AsyncLocalStorage.setItem("transactions", (state.transactions));
        }
    },
    actions: {
        async index(store, params = null) {
            params = params ? `/?${params}` : "";
            AsyncLocalStorage.getItem("transactions").then(transactions => {
                if (typeof transactions == "object" || transactions) {
                    store.commit("transactions", transactions);
                }
            })

            let response;
            AsyncLocalStorage.getItem("transactions").then(async transactions => {
                try {
                    response = await axios.get(apiURL + "index" + params, {
                        headers: {
                            "If-None-Match": (!params && transactions) ? transactions.ETag : null,
                        }
                    });

                    let responseTransactions = response.data.transactions;
                    responseTransactions["ETag"] = response.headers["ETag"] ?
                        response.headers["ETag"] : response.headers["etag"];

                    store.commit("transactions", responseTransactions)
                    AsyncLocalStorage.setItem("transactions", responseTransactions);
                } catch (error) {
                    if (!params) {
                        store.commit("transactions", transactions)
                    }
                    response = error.response;
                }
            });
            return response;

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
                const response = await axios.put(`${apiURL}update/`, {
                    "id": tx_id,
                    "amount": transaction.amount,
                    "note": transaction.note,
                    "date": transaction.date,
                });
                store.commit("updateTransactionsDataByID", {
                    'tx_id': tx_id,
                    "newValue": response.data.updated_transaction
                });
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
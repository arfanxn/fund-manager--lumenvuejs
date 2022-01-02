<template>
    <div>
        <h4>My Transactions</h4>

        <form
            class="d-none"
            id="formEditTransaction"
            @submit.prevent="saveEditTransaction($event)"
            action
        ></form>

        <table class="table table-light table-striped table-hover table-responsive text-start">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Type</th>
                    <th scope="col">Note</th>
                    <th scope="col">Date</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tx , index) in transactions.data" :key="index">
                    <th scope="row">{{ (index + 1) + ((transactions.current_page - 1) * 10) }}</th>
                    <td>
                        <span v-if="conditions.editingIndex == index">
                            <input
                                class="d-none"
                                :value="tx.id"
                                form="formEditTransaction"
                                readonly
                                name="id"
                                type="hidden"
                            />
                            <input
                                class="form-control form-control-sm"
                                placeholder="Amount in your currency"
                                :value="tx.amount"
                                name="amount"
                                form="formEditTransaction"
                                type="text"
                            />
                            <!--   v-model="formEditValues.amount" -->
                            <FormErrorSmall :error="formEditErrors.amount"></FormErrorSmall>
                        </span>
                        <span v-else>{{ tx.amount }}</span>
                    </td>
                    <td>
                        <!-- <span v-if="conditions.editingIndex == index">
                            <select
                                name="type"
                                class="form-select form-select-sm"
                                form="formEditTransaction"
                                :value="tx.type"
                            >
                                <option value="INCOME">INCOME</option>
                                <option value="EXPENSE">EXPENSE</option>
                            </select>
                            <FormErrorSmall :error="formEditErrors.type"></FormErrorSmall>
                        </span>
                        <span v-else>{{ tx.type }}</span>-->
                        <span>{{ tx.type }}</span>
                    </td>
                    <td>
                        <span v-if="conditions.editingIndex == index">
                            <input
                                class="form-control form-control-sm"
                                placeholder="Note or Description"
                                form="formEditTransaction"
                                :value="tx.note"
                                name="note"
                                type="text"
                            />
                            <FormErrorSmall :error="formEditErrors.note"></FormErrorSmall>
                        </span>
                        <span v-else>{{ tx.note }}</span>
                    </td>
                    <td>
                        <span v-if="conditions.editingIndex == index">
                            <input
                                class="form-control form-control-sm"
                                form="formEditTransaction"
                                name="date"
                                :value="tx.date"
                                type="date"
                            />
                            <FormErrorSmall :error="formEditErrors.date"></FormErrorSmall>
                        </span>
                        <span v-else>{{ tx.date }}</span>
                    </td>
                    <td class="d-flex justify-content-center">
                        <span v-if="conditions.editingIndex == index">
                            <button
                                class="btn btn-outline-danger"
                                @click="cancelEditTransaction()"
                            >Cancel</button>
                            <span class="mx-2"></span>
                            <button
                                form="formEditTransaction"
                                type="submit"
                                class="btn btn-outline-success"
                            >Save</button>
                        </span>
                        <span v-else>
                            <button
                                class="btn btn-outline-danger"
                                @click="deleteTransaction(index)"
                            >Delete</button>
                            <span class="mx-2"></span>
                            <button
                                class="btn btn-outline-info"
                                @click="editTransaction(index)"
                            >Edit</button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import FormErrorSmall from '../Errors/FormErrorSmall.vue';
import { computed, ref, onMounted, defineComponent } from 'vue'
import { useStore } from 'vuex';
const store = useStore();

const formEditErrors = ref({}),
    conditions = ref({ editingIndex: null });

defineComponent({
    FormErrorSmall
})

const transactions = computed(() => store.getters["transaction/transactions"]);

onMounted(() => {
    store.dispatch("transaction/index");
});





function saveEditTransaction(event) {
    formEditErrors.value = {};
    let tx = {};
    Object.keys(event.target).forEach(key => {
        const type = event.target[key].type;
        if (type == "hidden" || type == "text" || type == "number"
            || type == "select-one" || type == 'date') {
            tx[event.target[key].name] = event.target[key].value;
        }
    });

    store.dispatch("transaction/update", {
        tx_id: tx["id"],
        transaction: tx
    }).then(r => {
        if (r.status == 200 && ("transaction" in (r.data))) {
            conditions.value.editingIndex = null;
            store.dispatch("fund/myFund");
        } else if (r.status == 500) {
            formEditErrors.value["amount"] = r.data.error_message;
            return;
        } else if (!("transaction" in (r.data))) {
            let keys = Object.keys(r.data)
            keys.forEach(key => {
                formEditErrors.value[key] = r.data[key][0];
            });
        }
    });
}
function editTransaction(index) {
    formEditErrors.value = {};
    conditions.value.editingIndex = index;
}
function cancelEditTransaction() {
    formEditErrors.value = {};
    conditions.value.editingIndex = null;
}
function deleteTransaction(index) {
    if (confirm("Are you sure ?")) {
        const tx_id = (transactions.value.data)[index].id;
        store.dispatch("transaction/destroy", tx_id).then(r => r.status == 200 ?
            store.dispatch("fund/myFund") : false);
    }
}
</script>
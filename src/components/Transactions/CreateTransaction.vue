<template>
    <div class="mt-2 mb-5">
        <h4 class>Create a new transaction</h4>
        <table class="table table-responsive text-center">
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
                <tr>
                    <th scope="row">+</th>
                    <td>
                        <input
                            class="form-control form-control-sm"
                            placeholder="Amount in your currency"
                            v-model.number="formValues.amount"
                            type="text"
                        />
                        <FormErrorSmall :error="formErrors.amount"></FormErrorSmall>
                    </td>
                    <td>
                        <select class="form-select form-select-sm" v-model="formValues.type">
                            <!-- <option selected>Open select menu</option> -->
                            <option value="INCOME">INCOME</option>
                            <option value="EXPENSE">EXPENSE</option>
                        </select>
                        <FormErrorSmall :error="formErrors.type"></FormErrorSmall>
                    </td>
                    <td>
                        <textarea
                            class="form-control"
                            v-model="formValues.note"
                            placeholder="Note or Description"
                            rows="1"
                        ></textarea>
                        <FormErrorSmall :error="formErrors.note"></FormErrorSmall>
                    </td>
                    <td>
                        <input
                            class="form-control form-control-sm"
                            v-model="formValues.date"
                            type="date"
                        />
                        <FormErrorSmall :error="formErrors.date"></FormErrorSmall>
                    </td>
                    <td class="d-flex justify-content-center">
                        <button
                            class="btn btn-outline-danger"
                            @click="clearFormCreateTransaction()"
                        >Cancel</button>
                        <span class="mx-2"></span>
                        <button class="btn btn-outline-success" @click="addNewTransaction()">Add</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import FormErrorSmall from '../Errors/FormErrorSmall.vue';
const store = useStore();

defineComponent({
    FormErrorSmall,
});

const formValues = ref({
    amount: "", note: "", type: "", date: ""
}), formErrors = ref({});

function addNewTransaction() {
    store.dispatch("transaction/store", formValues.value).then(r => {
        if (r.status == 200) {
            clearFormCreateTransaction();
        } else if (!(r.data.error_message) && !("transaction" in (r.data))) {
            console.log(r.data);
            const keys = Object.keys(r.data);
            keys.forEach(key => {
                formErrors.value[key] = r.data[key][0];
            });
        } else if (r.data.error_message) {
            formErrors.value["amount"] = r.data.error_message;
        }
    });
}

function clearFormCreateTransaction() {
    const keys = Object.keys(formValues.value)
    keys.forEach(key => {
        formValues.value[key] = "";
    });
    formErrors.value = {};
}

</script>
<template>
    <div class="d-flex justify-content-between mt-3">
        <div class>
            <h1>Hi {{ authUser.name.substr(0, authUser.name.indexOf(' ')) }} , Welcome back!</h1>
        </div>
        <div class>
            <h5>Your Fund</h5>
            <input
                class="form-control"
                type="text"
                v-bind:value="myFund.balance"
                @blur="updateFundBalance"
                @keyup.enter="updateFundBalance"
                @input="onInput($event)"
            />
            <small v-if="!formEditErrors.balance" class="text-success">Balance is auto updated</small>
            <FormErrorSmall v-else :error="formEditErrors.balance"></FormErrorSmall>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineComponent, watch, computed } from 'vue';
import { useStore } from 'vuex';
import FormErrorSmall from '../Errors/FormErrorSmall.vue';
const store = useStore();
const formEditErrors = ref({});
const authUser = store.getters["auth/userCredentials"];

defineComponent({ FormErrorSmall });

onMounted(() => {
    store.dispatch("fund/myFund").then(() => "");
});

watch(() => store.state.transaction.transactions, () => {
    formEditErrors.value["balance"] = null
});

const myFund = computed(() => store.getters["fund/myFund"]);

function updateFundBalance(event) {
    event.target.blur();

    store.dispatch("fund/update", myFund.value["balance"]).then(r => {
        if (r.status == 200) {
            alert("Your balance has been updated");
        } else if (r.data.balance) {
            formEditErrors.value["balance"] = r.data.balance[0];
        } else {
            return;
        }
    });
}

function onInput(event) {
    myFund.value['balance'] = event.target.value;
    formEditErrors.value["balance"] = null;
}
</script>
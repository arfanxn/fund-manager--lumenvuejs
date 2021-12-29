<template>
    <div class>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="formValues.email" id="inputEmail" />
                <!-- <small class="text-danger" v-if="formErrors.email">{{ formErrors.email }}</small> -->
                <FormErrorSmall :error="formErrors.email"></FormErrorSmall>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="formValues.password"
                    id="inputPassword"
                />
                <FormErrorSmall :error="formErrors.password"></FormErrorSmall>
            </div>

            <button
                type="submit"
                class="btn btn-outline-success float-end mb-4"
                @click="handleLogin()"
            >Submit</button>
        </form>
    </div>
</template>

<script setup>
import FormErrorSmall from '../Errors/FormErrorSmall.vue';
import { ref, watch, defineComponent } from 'vue';
import { useStore } from "vuex";

const store = useStore();
const formValues = ref({ email: String(), password: String() }),
    formErrors = ref({ email: null, password: null });

defineComponent({ FormErrorSmall })

watch(() => formValues.value.email, () => {
    formErrors.value.email = null;
});
watch(() => formValues.value.password, () => {
    formErrors.value.password = null;
});

async function handleLogin() {
    store.dispatch("auth/login", formValues.value).then(({ data, statusText }) => {
        if (data.email || data.password) {
            formErrors.value.email = "email" in data ? data.email[0] : null;
            formErrors.value.password = "password" in data ? data.password[0] : null;
        } else if (data.error_message) formErrors.value.password = data.error_message;

        if (statusText.toLowerCase() == "ok") {
            window.location = "/";
        }
    })
}
</script>
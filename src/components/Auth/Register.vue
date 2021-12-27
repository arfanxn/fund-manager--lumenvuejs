<template>
    <div>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputFullname" class="form-label">Fullname</label>
                <input
                    type="text"
                    class="form-control"
                    id="inputFullname"
                    v-model="formValues.name"
                />
                <small class="text-danger" v-if="formErrors.name">{{ formErrors.name }}</small>
            </div>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="inputEmail" v-model="formValues.email" />
                <small class="text-danger" v-if="formErrors.email">{{ formErrors.email }}</small>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                    v-model="formValues.password"
                />
                <small class="text-danger" v-if="formErrors.password">{{ formErrors.password }}</small>
            </div>
            <div class="mb-3">
                <label for="inputConfPassword" class="form-label">Confirm Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputConfPassword"
                    v-model="formValues.password_confirmation"
                />
                <small
                    class="text-danger"
                    v-if="formErrors.password_confirmation"
                >{{ formErrors.password_confirmation }}</small>
            </div>
            <button
                type="submit"
                class="btn btn-outline-success float-end mb-4"
                @click="handleRegister()"
            >Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from "vuex";
const store = useStore();

const formValues = ref({
    name: String(), email: String(), password: String(), password_confirmation: String()
}), formErrors = ref({
    name: String(), email: String(),
    password: String(), password_confirmation: String()
});

watch(() => formValues.value.name, () => {
    formErrors.value.name = null;
});
watch(() => formValues.value.email, () => {
    formErrors.value.email = null;
});
watch(() => formValues.value.password, () => {
    formErrors.value.password = null;
});
watch(() => formValues.value.password_confirmation, () => {
    formErrors.value.password_confirmation = null;
});


async function handleRegister() {
    store.dispatch("auth/register", formValues.value)
        .then(({ data, statusText }) => {
            if (data.name || data.email || data.password || data.password_confirmation) {
                formErrors.value.name = "name" in data ? data.name[0] : null;
                formErrors.value.email = "email" in data ? data.email[0] : null;
                formErrors.value.password = "password" in data ? data.password[0] : null;
                formErrors.value.password_confirmation = "password_confirmation" in data
                    ? data.password_confirmation[0] : null;
            } else if (data.error_message) formErrors.value.password = data.error_message;

            if (statusText.toLowerCase() == "ok") {
                window.location = "/";
            }
        });
}
</script>
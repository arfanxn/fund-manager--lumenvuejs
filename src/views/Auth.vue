<template>
    <main class="d-flex justify-content-center">
        <div class="col-md-8 col-12 my-auto border border-top-0 rounded">
            <div class="bg-success p-3 rounded-top d-flex justify-content-between text-white">
                <div class="my-auto">
                    <h5 class="fw-bold">Money Manager</h5>
                </div>
                <div class="my-auto">
                    <a
                        href
                        class="text-decoration-none text-white fw-bold d-inline me-3"
                        @click.prevent="currentStep = `login`"
                    >Login</a>
                    <a
                        href
                        class="text-decoration-none text-white fw-bold d-inline"
                        @click.prevent="currentStep = `register`"
                    >Register</a>
                </div>
            </div>

            <div class="p-4">
                <keep-alive>
                    <Login v-if="currentStep == `login`"></Login>
                </keep-alive>
                <keep-alive>
                    <Register v-if="currentStep == `register`"></Register>
                </keep-alive>
            </div>
        </div>
    </main>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

const currentStep = ref("login");

defineComponent({ Login, Register });

// console.log(axios.defaults.baseURL);



</script>

<style scoped>
main {
    min-height: 100vh;
}
</style>
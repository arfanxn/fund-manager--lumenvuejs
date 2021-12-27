<template>
    <teleport to="#navbar-top">
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
            <div class="container-md">
                <a class="navbar-brand fw-bold" href="#">Fund Manager</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse d-md-flex justify-content-between"
                    id="navbarNavAltMarkup"
                >
                    <div class="navbar-nav">
                        <router-link
                            v-for="(navb ,index ) in state.navbars"
                            :key="index"
                            class="nav-link active"
                            :to="navb.link"
                        >{{ navb.text }}</router-link>
                    </div>
                    <div class="navbar-nav">
                        <a href class="nav-link" @click.prevent="handleLogout()">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </teleport>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const state = reactive({
    "navbars": [
        {
            "link": "/",
            "text": "Home"
        },
        {
            "link": "/about",
            "text": "About"
        },
    ]
});

function handleLogout() {
    store.dispatch("auth/logout").then(() => (window.location = "/authenticate"));
}
</script>
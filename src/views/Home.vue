<template>
  <div class="home">
    <NavbarTop></NavbarTop>
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->

    <h1>Home</h1>
    <h1>{{ userProfile }}</h1>
  </div>
</template>

<script setup>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavbarTop from '../components/NavbarTop.vue';
import { defineComponent, ref } from '@vue/runtime-core'
import { useStore } from 'vuex';
const store = useStore();
const userProfile = ref(Object());

defineComponent({
  /*HelloWorld, */ NavbarTop
})

userProfile.value = store.getters["auth/userProfile"];

</script>

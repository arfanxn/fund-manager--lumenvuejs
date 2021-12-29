<template>
  <div class="home">
    <NavbarTop></NavbarTop>
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <FundInfo></FundInfo>

    <CreateTransaction />

    <TableTransaction />

    <PaginatorTransaction />
  </div>
</template>

<script setup>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavbarTop from '../components/NavbarTop.vue';
import TableTransaction from '../components/Transactions/TableTransaction.vue';
import PaginatorTransaction from '../components/Transactions/PaginatorTransaction.vue';
import CreateTransaction from '../components/Transactions/CreateTransaction.vue';
import FundInfo from '../components/Funds/FundInfo.vue';
import { defineComponent } from 'vue'

defineComponent({
  /*HelloWorld,*/ NavbarTop, CreateTransaction,
  PaginatorTransaction, TableTransaction, FundInfo
});

</script>

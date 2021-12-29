<template>
    <small class="text-danger" v-if="error">{{ error }}</small>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
    error: String()
})



</script>
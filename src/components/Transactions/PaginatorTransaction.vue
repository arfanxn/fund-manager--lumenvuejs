<template>
    <div class="d-flex justify-content-between mb-5">
        <div>
            <h5 class="text-decoration-underline">Current Page : {{ transactions.current_page }}</h5>
        </div>
        <div>
            <button @click="loadPagination()" class="btn btn-success me-4">First Page</button>
            <button
                :disabled="!transactions.prev_page_url"
                @click="loadPagination(transactions.prev_page_url)"
                class="btn btn-success me-1"
            >Prev</button>
            <button
                :disabled="!transactions.next_page_url"
                @click="loadPagination(transactions.next_page_url)"
                class="btn btn-success"
            >Next</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const transactions = computed(() => store.getters["transaction/transactions"]);

function loadPagination(page = null) {
    page = page ? 'page=' + page.match(/\d+$/) : null;
    store.dispatch("transaction/index", page);
}

</script>
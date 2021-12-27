<template>
    <!-- Modal -->
    <div class="modal-backdrop fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <slot name="title"></slot>
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="closeModal()"
                    ></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>-->
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emits = defineEmits(["close"]);

function closeModal() {
    emits("close");
}

</script>

<style scoped>
.modal-backdrop {
    opacity: 1 !important;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>     

<template>
    <dialog ref="dialog" class="dialog_box">
      <div class="dialog_box__content">
        <button @click="closeDialog" class="dialog_box__close">&times;</button>
        <section class="dialog_box__body">
          <slot></slot>
        </section>
      </div>
    </dialog>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';

// Define emits
const emit = defineEmits<{
    (e: 'close'): void;
}>();

const dialog = ref<HTMLDialogElement | null>(null);

const openDialog = () => {
    dialog.value?.showModal();
};

const closeDialog = () => {
    dialog.value?.close();
    emit('close');
};


defineExpose({
    openDialog,
    closeDialog,
    dialog
});
</script>
  
<style scoped>
    /* TODO: Finish Styles */
    .dialog_box {
        max-width: 100vw;
        width: 100vw;
        margin: 40px auto;
        gap: 16px;
        padding-top: 45px;
    }
    .dialog_box__close {
        position: absolute;
        top: 10px;
        right: 20px;
        background: none;
        border: none;
        font-size: var(--text-size-500);
        line-height: normal;
    }
    .dialog_box__body {
        min-height: 200px;
    }
</style>
<template>
    <dialog ref="dialog" class="dialog_box">
      <div class="dialog_box__content">
        <header class="dialog_box__header">
            <h2 class="dialog_box__title"><slot name="title"></slot></h2>
            <button @click="closeDialog" class="dialog_box__close">&times;</button>
        </header>
        <section class="dialog_box__body">
          <slot name="body"></slot>
        </section>
      </div>
    </dialog>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';

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
    .dialog_box {
        max-width: 100vw;
        width: 100vw;
        gap: 16px;
        border: none;
        @media(min-width: 980px) {
            width: 25vw;
            margin: auto;
        }
        
    }
    .dialog_box__close {
        background: none;
        border: none;
        font-size: var(--text-size-500);
        line-height: normal;
    }
    .dialog_box__content {
        padding: 16px;
    }
    .dialog_box__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .dialog_box__title {
        font-size: var(--text-size-400);
    }
</style>
<template>
    <DialogBox ref="dialogRef">
        <template #title>
            Editing Image...
        </template>
        <template #body>
            <div class="form_group">
                <label for="alt">Alternative Text:</label>
                <input
                    type="text"
                    id="alt"
                    v-model="formImageProps.attributes.alt"
                    placeholder="Alternative Text"
                    @change="emit('onImageChange', formBlockIndex, formImageProps)"
                />
            </div>
        </template>
    </DialogBox>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import DialogBox from './DialogBox.vue';
    import type { HtmlImageNodeProps } from '../core/BlockNode';
    const formBlockIndex = ref(-1);
    const formImageProps = ref<HtmlImageNodeProps>({
        htmlTag: 'img',
        attributes: {
            src: '',
            alt: '',
            width: 0,
            height: 0
        },
        content: undefined
    });
    
    const emit = defineEmits<{
            (e: 'onImageChange', blockIndex: number, attributes: HtmlImageNodeProps): void
        }
    >();
    const dialogRef = ref<InstanceType<typeof DialogBox>>();
    function open(blockIndex: number, currentAttributes: HtmlImageNodeProps) {
        formBlockIndex.value = blockIndex;
        formImageProps.value = currentAttributes;
        dialogRef.value?.openDialog()
    }
    defineExpose({
        open
    });

</script>

<style scoped>
  .form_group {
    display: grid;
  }
</style>
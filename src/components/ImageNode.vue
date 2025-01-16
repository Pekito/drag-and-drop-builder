<template>
    <div :class="{'image_node__wrapper': true, 'no_image': !imageProps.attributes.src}" >
        <button class="preview_edit" v-if="imageProps.attributes.src" @click="openEditDialog(blockIndex, imageProps)">📝</button>
        <div :class="{'image_node': true}" @click="openFileInput">
            <div v-if="imageProps.attributes.src" class="preview_container">
                <img :src="imageProps.attributes.src" alt="Selected Image" class="image_node__preview"/>
            </div>
            <div v-else class="image_node__placeholder">No Image</div>
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileChange"
            />
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue';
    import type { ImageNode } from '../core/HtmlNode';
    import type { HtmlNodeProps } from '../core/BlockNode';
    import { useEditImageDialog } from '../composables/useImageDialog';
    type ImageNodeProps = HtmlNodeProps<ImageNode>
    const props = defineProps<ImageNodeProps & {blockIndex: number}>();
    const emit = defineEmits(["onAttributeChange"]);
    const imageProps = ref({...props});
    const {openDialog: openEditDialog} = useEditImageDialog();

    const fileInput = ref<HTMLInputElement | null>(null);
    const openFileInput = () => {
        fileInput.value?.click();
    };
    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgSrc = e.target?.result as string;
                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                imageProps.value.attributes = {
                    height: img.naturalHeight,
                    width: img.naturalWidth,
                    alt: file.name, 
                    src: imgSrc,
                }
                emit("onAttributeChange", imageProps.value.attributes);
            }
            };
            reader.readAsDataURL(file);
        }
    };
</script>
  
<style scoped>
  .image_node {
    width: fit-content;
    .no_image &{
        width: 100%;
        background-color: #f0f0f0;
    }
    border: 2px dashed #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
  }
  
  .image_node__placeholder {
    color: #888;
    font-size: 16px;
    text-align: center;
  }
  .image_node__wrapper {
    position: relative;
    z-index: 1;
    width: fit-content;
    &.no_image {
        width: 100%;
    }
  }
  .preview_edit {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
  }
</style>
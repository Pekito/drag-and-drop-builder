<template>
    <div :class="{'image_node__wrapper': true, 'no_image': !imageAttributes.src}" >
        <button class="preview_edit" v-if="imageAttributes.src" @click="openEditDialog">📝</button>
        <DialogBox ref="editDialogRef">
            <template #title>
                Editing Image...
            </template>
            <template #body>
                <div class="form_group">
                    <label for="alt">Alternative Text:</label>
                    <input
                        type="text"
                        id="alt"
                        v-model="imageAttributes.alt"
                        placeholder="Alternative Text"
                    />
                </div>
            </template>
        </DialogBox>
        <div :class="{'image_node': true}" @click="openFileInput">
            <div v-if="imageAttributes.src" class="preview_container">
                <img :src="imageAttributes.src" alt="Selected Image" class="image_node__preview"/>
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
    import DialogBox from './DialogBox.vue';
    import type { ImageNode } from '../core/HtmlNode';
    import type { HtmlNodeProps } from '../core/BlockNode';
    const editDialogRef = ref<InstanceType<typeof DialogBox> | null>(null);
    type ImageNodeProps = HtmlNodeProps<ImageNode>
    const props = defineProps<ImageNodeProps>();
    const emit = defineEmits(["onAttributeChange"]);
    const imageAttributes = ref({
        height: props.attributes.height,
        width: props.attributes.width,
        alt: props.attributes.alt,
        src: props.attributes.src 
    });

    function openEditDialog() {
        editDialogRef.value?.openDialog()
    }
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
                imageAttributes.value = {
                    height: img.naturalHeight,
                    width: img.naturalWidth,
                    alt: file.name, 
                    src: imgSrc,
                }
                emit("onAttributeChange", imageAttributes.value);
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
  .form_group {
    display: grid;
  }
</style>
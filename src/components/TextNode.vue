<template>
    <div class="text_node">
        <textarea
            :value="content"
            @input="onInput"
        ></textarea>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TextNode } from '../core/HtmlNode';
import type { HtmlNodeProps } from '../core/BlockNode';
type TextNodeProps = HtmlNodeProps<TextNode>


const props = defineProps<TextNodeProps & {content: string}>();
const content = ref(props.content);
const emit = defineEmits(['onContentChange']);

const onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    content.value = target.value;
    emit('onContentChange', target.value);
};
</script>

<style scoped>
.text_node textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
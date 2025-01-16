<template>
    <DialogBox ref="dialogRef" id="edit_nodes">
      <template #title>Editing Blocks...</template>
      <template #body>
        <div class="actions">
        <button class="button dialog_button" @click="emit('onAddNewNodeClick', 'p')">+ Add Text</button>
        <button class="button dialog_button" @click="emit('onAddNewNodeClick', 'img')">+ Add Image</button>
      </div>
        <Draggable 
          v-model="localNodes" 
          @start="drag=true" 
          @end="drag=false" 
          item-key="key"
          class="edit_nodes__list"
          handle=".item_position""
          >
          <template #item="{element, index}">
            <div class="edit_nodes__item">
              <button class="item_position">☰</button>
              <p class="item_title" contenteditable @input="(e) => emit('onNodeTitleChange', index, e.target.textContent)">{{ element.title }}</p>
              <div style="display: flex; gap: 16px; margin-left: auto; align-items: center;">
                <p class="edit_nodes__duplicate" @click="emit('onDuplicateNode', index)">📋</p>
                <p class="edit_nodes__delete" @click="emit('onDeleteNode', index)">❌</p>
              </div>
            </div>
          </template>
        </Draggable>
      </template>
    </DialogBox>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Draggable from "vuedraggable";
import DialogBox from './DialogBox.vue';
import type { BlockNodeProps } from '../core/BlockNode';
    const props = defineProps({
        nodes: {
            type: Array<BlockNodeProps>,
            required: true
        }
    })
    const localNodes = ref(props.nodes);
    watch(localNodes, () => {
      emit('onNodeOrderChange', localNodes.value)
    })
    const emit = defineEmits<{
        (e: 'onNodeOrderChange', nodes: Array<BlockNodeProps>): void
        (e: 'onAddNewNodeClick', nodeType: "img" | "p"): void
        (e: 'onDuplicateNode', nodeIndex: number): void
        (e: 'onDeleteNode', nodeIndex: number): void
        (e: 'onNodeTitleChange', nodeIndex: number, newTitle: string): void
    }>();
    const drag = ref(false);
    const dialogRef = ref<InstanceType<typeof DialogBox> | null>(null);
    function open() {
        dialogRef.value?.openDialog()
    }
    defineExpose({open})
</script>

<style scoped>
 #edit_nodes {
    .edit_nodes__list {
      display: grid;
    }
    .actions {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    .dialog_button {
      padding: 8px;
      font-size: var(--text-size-050);
      font-weight: 600;
    }
    
  }
 
  .edit_nodes__item {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: var(--text-size-200);
    border-top: 1px solid #EDEDED;
    &:not(:first-of-type){ border-bottom: 1px solid #EDEDED;}
    padding: 8px;
    .edit_nodes__delete {
      font-size: 12px;
    }
    .item_position {
      width: 40px;
      cursor: pointer;
      background: none;
      border: none;
    }
    .item_title {
      position: relative;
    }
  }
</style>
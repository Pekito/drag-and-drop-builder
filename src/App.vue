
<template>
<main id="app">
  <aside id="menu">
    <h1 class="menu_title">Pedro <sup><i style="background: #09C269; color: #FFF; padding: 4px; border-radius: 4px;">Lite</i></sup></h1>
    <div class="export_area">
      <button class="button button--export" @click="exportStructure">⬆️ Export to JSON</button>
    </div>
  </aside>
  <div id="blocks">
    <DialogBox ref="dialogRef" id="edit_nodes">
      <template #title>Editing Blocks...</template>
      <template #body>
        <div class="actions">
        <button class="button dialog_button" @click="() => addNewNode(createTextNodeBlock())">+ Add Text</button>
        <button class="button dialog_button" @click="() => addNewNode(createImageNodeBlock())">+ Add Image</button>
      </div>
        <Draggable 
          v-model="nodes" 
          @start="drag=true" 
          @end="drag=false" 
          item-key="key"
          class="edit_nodes__list"
          handle=".item_position""
          >
          <template #item="{element, index}">
            <div class="edit_nodes__item">
              <button class="item_position">☰</button>
              <p class="item_title" contenteditable @input="(e) => nodes[index].title = e.target.textContent">{{ element.title }}</p>
              <div style="display: flex; gap: 16px; margin-left: auto; align-items: center;">
                <p class="edit_nodes__duplicate" @click="nodes.splice(index,0,{...nodes[index]})">📋</p>
                <p class="edit_nodes__delete" @click="nodes.splice(index, 1)">❌</p>
              </div>
            </div>
          </template>
        </Draggable>
      </template>
    </DialogBox>
    <div id="preview">
      <header class="preview_header" style="">
        <h2>Preview</h2>
        <button @click="openDialog" class="button button--edit">📝 Edit Blocks</button>
      </header>
  
      <ul id="nodes">
          <li v-for="node in nodes">
            <component 
              :is="nodeToComponent(node)"
              v-bind="node.props" 
              @onContentChange="(content: HtmlContent) => node.props.content = content " 
              @onAttributeChange="(attributes: HtmlAttributes) => node.props.attributes = attributes"/>
          </li>
      </ul>
      <div class="actions">
        <button class="button button--add" @click="() => addNewNode(createTextNodeBlock())">[+] Add Text</button>
        <button class="button button--add" @click="() => addNewNode(createImageNodeBlock())">[+] Add Image</button>
      </div>
    </div>
  </div>
</main>
</template>
<script setup lang="ts">
  import {ref} from 'vue';
  import TextNode from './components/TextNode.vue';
  import DialogBox from './components/DialogBox.vue';
  import ImageNode from './components/ImageNode.vue';
  import Draggable from "vuedraggable";
  import { createImageNodeBlock, createTextNodeBlock, type BlockNodeProps } from './core/BlockNode';
  import type { HtmlAttributes, HtmlContent } from './core/HtmlNode';
 
  const nodes = ref<Array<BlockNodeProps>>([]);
  const drag = ref(false);
  const dialogRef = ref<InstanceType<typeof DialogBox> | null>(null);
  function openDialog() {
    dialogRef.value?.openDialog()
  }
  const nodeToComponent = (node: BlockNodeProps) => {
    switch(node.props.htmlTag) {
      case 'img': return ImageNode
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'p':
      case 'span':
      case 'strong': return TextNode;
    }
  }
  const exportStructure = () => {
    const propList = nodes.value.map(node => node.props);
    console.log(JSON.stringify(propList));
  }
  const addNewNode = (node: BlockNodeProps) => {
    nodes.value.push(node);
  } 

</script>

<style scoped>
  #app {
    height: 100vh;
    grid-template-areas:  "menu"
                          "blocks";
    grid-template-rows: auto 1fr;
  }
  #menu {
    grid-area: menu;
    width: 100%;
    height: fit-content;
    padding: 16px;
    align-items: center;
    justify-items:center;
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media(min-width: 980px) {
      flex-direction: row;
      gap: unset;
      justify-content: space-between;
  } 
  }
  #blocks {
    grid-area: blocks;
  }
  #nodes {
    display: grid;
    gap: 8px;
    margin-bottom: 16px;
  }
  .menu_title {
    font-weight: 600;
    font-size: var(--text-size-300);
  }
  .button {
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;  
  }
  .button--export {
    background: #09C269;
    padding: 12px 20px;
    color: white;
  }
  .button--edit {
    background: none;
  }
  .button--add {
    background-color: rgba(209, 213, 219, 1);
    color: rgba(55, 65, 81, 1);
    font-size: var(--text-size-100);
    padding: 12px 0;
    width: 100%;
  }

  #edit_nodes {
    .edit_nodes__list {
      display: grid;
    }
    .actions {
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
  .actions {
    display: flex;
    gap: 16px;
  }
  #preview {
    padding: 16px 16px 0 16px;
    background: #F3F4F6;
    height: 100%;
    .preview_header {
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      margin-bottom: 16px;
    }
  }
  
  .export_area {
    display: flex; 
    align-items: center; 
    justify-content: center;
  }
</style>

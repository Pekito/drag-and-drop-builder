
<template>
<main id="app">
  <aside id="menu">
    <h1 class="menu_title">Pedro <sup><i style="background: #09C269; color: #FFF; padding: 4px; border-radius: 4px;">Lite</i></sup></h1>
    <div class="export_area">
      <button class="button button--export" @click="exportStructure">⬆️ Export to JSON</button>
    </div>
  </aside>
  <div id="blocks">
    <EditBlocksDialog 
      ref="editBlocksDialog"
      :nodes="nodes"
      @onNodeOrderChange="handleNodeOrderChange"
      @onNodeTitleChange="handleNodeTitleChange"
      @onDeleteNode="handleNodeDelete"
      @onDuplicateNode="handleNodeDuplication"
      @onAddNewNodeClick="handleAddNewNodeClick"
    />
    <div id="preview">
      <header class="preview_header" style="">
        <h2>Preview</h2>
        <button @click="editBlocksDialog?.open()" class="button button--edit">📝 Edit Blocks</button>
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
  import ImageNode from './components/ImageNode.vue';
  import { createImageNodeBlock, createTextNodeBlock, type BlockNode, type BlockNodeProps } from './core/BlockNode';
  import type { HtmlAttributes, HtmlContent } from './core/HtmlNode';
  import EditBlocksDialog from './components/EditBlocksDialog.vue';
 
  const nodes = ref<Array<BlockNodeProps>>([]);
  const editBlocksDialog = ref<InstanceType<typeof EditBlocksDialog> | null>(null);
  const htmlTagToComponent = (tag: "img" | "p") => {
    switch(tag) {
      case 'img': return ImageNode
      case 'p': return TextNode;
    }
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
  const handleAddNewNodeClick = (type: "img" | "p") => {
    const htmlTagToComponent = () => {
      switch(type) {
        case 'img': return createImageNodeBlock()
        case 'p': return createTextNodeBlock();
      }
    }
    nodes.value.push(htmlTagToComponent());
  }
  const exportStructure = () => {
    const propList = nodes.value.map(node => node.props);
    console.log(JSON.stringify(propList));
  }
  const addNewNode = (node: BlockNodeProps) => nodes.value.push(node);
  const handleNodeOrderChange = (newNodes: Array<BlockNodeProps>) => nodes.value = newNodes;
  const handleNodeTitleChange = (nodeIndex: number, newTitle: string) => nodes.value[nodeIndex].title = newTitle
  const handleNodeDelete = (nodeIndex: number) => nodes.value.splice(nodeIndex, 1);
  const handleNodeDuplication = (nodeIndex: number) => nodes.value.splice(nodeIndex, 0, {...nodes.value[nodeIndex]})
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

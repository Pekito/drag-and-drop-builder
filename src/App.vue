
<template>
<main id="app">
  <aside id="menu">
    <h1 class="menu_title">Pedro's Drag and Drop Builder</h1>
  </aside>
  <div id="blocks">
    <DialogBox ref="dialogRef">
      <!-- TODO: Create Edit Blocks Dialog (add/remove/change order) -->
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae amet libero esse dolorum iusto nihil officia soluta dolores odio rem, delectus consequatur nobis quis consequuntur, cum laudantium ea ex reprehenderit?</p>
    </DialogBox>
    <button @click="openDialog">Edit Blocks</button>
    <ul id="nodes">
      <li v-for="node in nodes">
        <component 
          :is="nodeToComponent(node)"
          v-bind="node" 
          @onContentChange="(content: HtmlContent) => node.content = content " 
          @onAttributeChange="(attributes: HtmlAttributes) => node.attributes = attributes"/>
      </li>
    </ul>
  </div>
</main>
</template>
<script setup lang="ts">
  import {ref} from 'vue';
  import TextNode from './components/TextNode.vue';
  import DialogBox from './components/DialogBox.vue';
  import ImageNode from './components/ImageNode.vue';
import { createImageNodeBlock, createTextNodeBlock, type BlockNodeProps } from './core/BlockNode';
import type { HtmlAttributes, HtmlContent } from './core/HtmlNode';
 
  const nodes = ref<Array<BlockNodeProps>>([]);
  nodes.value.push(createImageNodeBlock(), createTextNodeBlock())
  const dialogRef = ref<InstanceType<typeof DialogBox> | null>(null);
  function openDialog() {
    dialogRef.value?.openDialog()
  }
  const nodeToComponent = (node: BlockNodeProps) => {
    switch(node.htmlTag) {
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
  
</script>

<style scoped>
  #app {
    display: grid;
    gap: 16px;
    height: 100vh;
    grid-template-areas:  "menu"
                          "blocks";
    grid-template-rows: auto 1fr;
      @media(min-width: 1140px) {
      grid-template-areas: "menu blocks";

    }
  }
  #menu {
    grid-area: menu;
    width: 100%;
    height: fit-content;
    padding: 16px;
    border-bottom: solid 2px black;
    align-items: center;
    justify-items:center;
    @media(min-width: 1140px) {
      border-right: solid 2px black;
      width: fit-content;
  }
  }
  #blocks {
    grid-area: blocks;
  }
  #nodes {
    display: grid;
    gap: 8px;
  }
  .menu_title {
    font-size: var(--text-size-300);
  }
</style>

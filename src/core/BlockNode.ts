import type { HtmlNode, ImageNode, TextNode } from "./HtmlNode";
import { generateRandomStringKey } from "./StringUtils";
export type BlockNode = ImageNode | TextNode;
export type HtmlNodeProps<Node extends HtmlNode> = Pick<Node, "htmlTag" | "attributes" | "content">
export type ComponentNodeProps<T extends HtmlNode> = {
  props: HtmlNodeProps<T>,
  key: string,
  title: string
}
export type BlockNodeProps = ComponentNodeProps<BlockNode>
type CreateNodeBlockParams<T extends HtmlNode> = {
  nodeProps: HtmlNodeProps<T>,
  title: string
}
export type HtmlImageNodeProps = HtmlNodeProps<ImageNode>;
export const createNodeBlock = <T extends HtmlNode>(params: CreateNodeBlockParams<T>): ComponentNodeProps<T> => {
    return {
        key: generateRandomStringKey(),
        props: params.nodeProps,
        title: params.title
    }
}

export const createImageNodeBlock = (): ComponentNodeProps<ImageNode> => createNodeBlock({
    nodeProps: {
      htmlTag: "img",
      content: null,
      attributes: {
        src: "",
        alt: "",
        width: 0,
        height: 0
      }
    },
    title: "Image"
  });
export const createTextNodeBlock = (): ComponentNodeProps<TextNode> => createNodeBlock({
  nodeProps: {
    htmlTag: "p",
    attributes: {},
    content: ""
  },
  title: "Text"
})
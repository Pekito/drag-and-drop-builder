import type { HtmlNode, ImageNode, TextNode } from "./HtmlNode";
import { generateRandomStringKey } from "./StringUtils";
export type BlockNode = ImageNode | TextNode;
export type HtmlNodeProps<Node extends HtmlNode> = Pick<Node, "htmlTag" | "attributes" | "content">
export type ComponentNodeProps<T extends HtmlNode> = HtmlNodeProps<T> & {key: string}
export type BlockNodeProps = ComponentNodeProps<BlockNode>
export const createNodeBlock = <T extends HtmlNode>(nodeProps: HtmlNodeProps<T>): ComponentNodeProps<T> => {
    return {
        key: generateRandomStringKey(),
        ...nodeProps
    }
}

export const createImageNodeBlock = (): ComponentNodeProps<ImageNode> => createNodeBlock({
    htmlTag: "img",
    content: undefined,
    attributes: {
      src: "",
      alt: "",
      width: 0,
      height: 0
    }
  });
export const createTextNodeBlock = (): ComponentNodeProps<TextNode> => createNodeBlock({
    htmlTag: "p",
    attributes: {},
    content: ""
})
import { isValidImageSource } from "./StringUtils";
import {createResultError, createResultSuccess, type Result, type TaggedType } from "./Types";

type HtmlTextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong";

export type HtmlAttributes = Record<string,string | number>;
export type HtmlNode<Tag extends string = string, Attributes extends HtmlAttributes = HtmlAttributes> = TaggedType<"html-node", {
    content: HtmlNode | string | undefined | Array<HtmlNode>
    attributes: Attributes
    classes: Array<string>
    selfClosing: boolean
    htmlTag: Tag
}>
export type HtmlStringNode = HtmlNode<"string">
export type HtmlContent = HtmlNode | Array<HtmlNode | HtmlStringNode>;
export type ImageAttributes = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };

export type ImageNode = HtmlNode<"img", ImageAttributes>;
export type TextNode = HtmlNode<HtmlTextTags>;

type CreateNodeError = "invalid-value" | "required-value";
type CreateImageNodeProps = {
    attributes: ImageAttributes
    classes?: Array<string>
}
export type CreateImageNodeError = TaggedType<CreateNodeError, {message: string}>
export const createImageNode = (
    props: CreateImageNodeProps
  ): Result<ImageNode, CreateImageNodeError> => {
    const {src} = props.attributes;
    if(!src) return createResultError({
        _tag: "required-value",
        message: "A source must be provided"
    });
    if(!isValidImageSource(src)) return createResultError({
        _tag: "invalid-value",
        message: "a valid source must be provided"
    });
    const imageNode: ImageNode = {
        _tag: "html-node",
        content: undefined,
        attributes: props.attributes,
        classes: props.classes ?? [],
        selfClosing: true,
        htmlTag: "img",
      } 
    return createResultSuccess(imageNode)
}
export const createStringNode = (str: string): HtmlStringNode => ({
    _tag: "html-node",
    content: str,
    htmlTag: "string",
    attributes: {},
    classes: [],
    selfClosing: false
}) 
export const createTextNode = (props: {
    content: HtmlContent,
    htmlTag: HtmlTextTags
}): TextNode => {
    return ({
        _tag: "html-node",
        content: props.content,
        htmlTag: props.htmlTag,
        attributes: {},
        classes: [],
        selfClosing: false
    });
}
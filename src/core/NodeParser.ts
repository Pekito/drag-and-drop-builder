import { type HtmlAttributes, type HtmlNode} from "./HtmlNode";
const removeEmptySpaces = (str: string) => str.replace(/  +/g, "")
const parseAttributes = (attributes: HtmlAttributes) => {
    return Object.entries(attributes)
    .filter(([_, value]) => !!value )
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}
const parseClasses = (classes: Array<string>) => classes.join(" ");
export const parseHtmlNode = (node: HtmlNode): string => {
    if(node.htmlTag === "string") return node.content as string;
    const attributes = parseAttributes(node.attributes);
    const classes = parseClasses(node.classes);
    const nextContent = () => {
        if(!node.content) return "";
        if(typeof node.content === "string") return node.content;
        if(Array.isArray(node.content)) {
            return node.content.map(parseHtmlNode).join("")
        }
        if(typeof node.content === "object")  return parseHtmlNode(node.content);
        throw new Error("Could not parse");
    }
    if(node.selfClosing) return `<${node.htmlTag} ${attributes} ${classes}/>`;
    return removeEmptySpaces(`<${node.htmlTag} ${attributes} ${classes}>${nextContent()}</${node.htmlTag}>`);
}
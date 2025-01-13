import { createImageNode, createStringNode, createTextNode, type CreateImageNodeError, type ImageNode } from "../src/core/HtmlNode"
import { parseHtmlNode } from "../src/core/NodeParser";
import type { ResultError } from "../src/core/Types";
describe("TextNode", () => {
    test("Should create a text node", () => {
        const textNode = createTextNode({
            content: createStringNode("I am a paragraph"),
            htmlTag: "p"
        });
        const parsed = parseHtmlNode(textNode);
        expect(parsed).toBe("<p>I am a paragraph</p>");
    });
    test("Should create a nested text node", () => {
        const highlightedNode = createTextNode({
            content: createStringNode("I am highlighted"),
            htmlTag: "strong"
        });
        const containerNode = createTextNode({
            content: [highlightedNode, createStringNode(".")],
            htmlTag: "p"
        });
        const parsed = parseHtmlNode(containerNode);
        expect(parsed).toBe("<p><strong>I am highlighted</strong>.</p>");
    });
    test("Should create an empty text tag", () => {
        const textNode = createTextNode({
            content: createStringNode(""),
            htmlTag: "p"
        });
        const parsed = parseHtmlNode(textNode);
        expect(parsed).toBe("<p></p>");
    })
})
describe("ImageNode", () => {
    test("Should create an image", () => {
        const image = createImageNode({
            attributes: {
                src: "https://valid.source/image.png",
                alt: "Alternative Text",
            }
        }) as ImageNode;
        expect(parseHtmlNode(image)).toBe(`<img src="https://valid.source/image.png" alt="Alternative Text" />`);
    });
    test("Should fail to create an image without source", () => {
        const imageResult = createImageNode({
            attributes: {
                src: "",
                alt: "Alternative Text",
            }
        }) as ResultError<CreateImageNodeError>;
        expect(imageResult.ok).toBe(false);
        expect(imageResult.error._tag).toBe("required-value");
    })
    test.each(
        [
        "invalid", 
        "https://valid.link/invalid_image.pdf"
        ]
        )("Should fail to create an image with invalid source [%s]", (invalidSource) => {
        const imageResult = createImageNode({
            attributes: {
                src: invalidSource,
                alt: "Alternative Text",
            }
        }) as ResultError<CreateImageNodeError>;
        expect(imageResult.ok).toBe(false);
        expect(imageResult.error._tag).toBe("invalid-value");
    })
})

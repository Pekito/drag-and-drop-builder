import { isValidImageSource } from "../src/core/StringUtils";

describe("isValidImageSource", () => {
    test("Should return true on valid src", () => {
        const validSource = "https://website.com/valid.png";
        expect(isValidImageSource(validSource)).toBe(true);
    });
    test.each([
        "",
        "https://example.com/not-an-image.txt",
        "example.com/image.png"
    ])("Should return false on invalid src [%s]", (invalidSrc) => {
        expect(isValidImageSource(invalidSrc)).toBe(false);
    })
})
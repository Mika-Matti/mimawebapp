import { sanitizeHTML } from "../../src/utils/formatUtils";

describe("Test encodeHTML", () => {
  const expectedString: string =
    "<p>I was able to find " +
    '<a href="https://giflib.sourceforge.net/whatsinagif/index.html" ' +
    'target="_blank">this website</a>, ' +
    "which explained in great detail the bits and pieces of a GIF-file " +
    "and how to uncompress it.</p>";
  const testInput: string =
    "<p>I was able to find " +
    '<a href="https://giflib.sourceforge.net/whatsinagif/index.html" ' +
    'target="_blank" rel="noopener">this website</a>, ' +
    "which explained in great detail the bits and pieces of a GIF-file " +
    "and how to uncompress it.</p>";

  it("should return a sanitized html string that matches expectedString", () => {
    const testString = sanitizeHTML(testInput);
    expect(testString).toBe(expectedString);
  });
});

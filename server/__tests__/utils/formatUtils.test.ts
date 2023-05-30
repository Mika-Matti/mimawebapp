import { sanitizeHTML, validateInput } from "../../src/utils/formatUtils";

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

describe("Test validateInput", () => {
  it("should return true when validating an acceptable string", () => {
    const testInput: string = "user-name@username.net";
    const testOutput: boolean = validateInput(testInput);
    const expectedOutput: boolean = true;
    expect(testOutput).toBe(expectedOutput);
  });

  it("should return false, when validating a string with forbidden characters", () => {
    const testInput: string = "username+%3Cscript%3Eevil_script()%3C/script%3E";
    const testOutput: boolean = validateInput(testInput);
    const expectedOutput: boolean = false;
    expect(testOutput).toBe(expectedOutput);
  });

  it("should return false, when validating a string with forbidden characters", () => {
    const testInput: string = "username'; DROP TABLE users; --";
    const testOutput: boolean = validateInput(testInput);
    const expectedOutput: boolean = false;
    expect(testOutput).toBe(expectedOutput);
  });

  it("should return false, when validating a string with forbidden characters", () => {
    const testInput: string = "password' OR '1'='1";
    const testOutput: boolean = validateInput(testInput);
    const expectedOutput: boolean = false;
    expect(testOutput).toBe(expectedOutput);
  });

  it("should return false, when validating a string with forbidden characters", () => {
    const testInput: string =
      "password' UNION SELECT username, password FROM users --";
    const testOutput: boolean = validateInput(testInput);
    const expectedOutput: boolean = false;
    expect(testOutput).toBe(expectedOutput);
  });
});

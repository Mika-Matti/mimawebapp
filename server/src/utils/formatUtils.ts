const sanitizeHtml = require("sanitize-html");

export const sanitizeHTML = (text: string): string => {
  const sanitizedText: string = sanitizeHtml(text, {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
  });

  return sanitizedText;
};

export const validateInput = (text: string): boolean => {
  // Remove leading and trailing whitespace
  const trimmedInput: string = text.trim();

  // Define allowed characters for usernames and passwords
  const allowedCharacters: RegExp = /^[a-zA-Z0-9@.-]+$/;

  const isValid = allowedCharacters.test(trimmedInput);

  if (isValid) {
    return true;
  } else {
    return false;
  }
};

export const formatDate = (input: string): string => {
  // input is in format: yyyy-MM-ddThh:mm:ss.sssZ
  const date: string = new Date(input).toLocaleDateString("en-GB");
  // date is in format is dd/MM/yyyy
  const list = date.split("/");

  const output = list[2] + "-" + list[1] + "-" + list[0];
  // output is in format: yyyy-MM-dd
  return output;
};

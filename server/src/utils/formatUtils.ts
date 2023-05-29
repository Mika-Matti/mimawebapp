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

const sanitizeHtml = require("sanitize-html");

export const sanitizeHTML = (text: string): string => {
  const sanitizedText: string = sanitizeHtml(text, {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
  });

  return sanitizedText;
};

const sanitizeHtml = require("sanitize-html");

export const sanitizeHTML = (text: string): string => {
  const sanitizedHtmlOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["iframe", "img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
      ],
      img: ["src", "alt", "width", "height"],
    },
  };
  const sanitizedText: string = sanitizeHtml(text, sanitizedHtmlOptions);

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

export const getTimeStamp = (): string => {
  // input is in format: yyyy-MM-ddThh:mm:ss.sssZ
  const date = new Date();

  // Extract the date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // output is in format: yyyy-MM-dd hh:mm:ss
  const output = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return output;
};

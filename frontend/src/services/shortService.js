import { shortBaseUrl } from "../helpers/urls";

const messagesBase = shortBaseUrl + "messages";

export const getMessages = async () => {
  const results = await fetch(messagesBase);
  return results.json();
};

export const getUpdatedMessages = async (id) => {
  const results = await fetch(`${messagesBase}?id=${id}`);
  return results.json();
};

export const postMessage = (message) => {
  return fetch(messagesBase, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: message }),
  });
};

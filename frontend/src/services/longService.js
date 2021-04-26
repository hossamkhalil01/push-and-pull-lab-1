import { longBaseUrl } from "../helpers/urls";

const messagesBase = longBaseUrl + "messages";

export const getMessages = async () => {
  const results = await fetch(messagesBase);
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

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [];
let subsList = [];

app.get("/short/messages", (req, res) => {
  if (!req.query.id) return res.json(messages);

  const filteredMessages = messages.filter(
    (message) => message.id > req.query.id
  );

  res.json(filteredMessages);
});

app.post("/short/messages", (req, res) => {
  if (req.body.body) {
    const newMessage = req.body;

    newMessage.id = messages.length + 1;

    messages.push(newMessage);

    res.status("200").json(newMessage);
  } else {
    res.status("422").json("invalid inputs");
  }
});

app.get("/long/messages", (req, res) => {
  res.id = subsList.length;
  subsList.push(res);

  req.on("close", () => {
    subsList.splice(res.id, 1);
  });
});

app.post("/long/messages", (req, res) => {
  if (!req.body.body) return res.status("422").json("invalid inputs");

  const newMessage = req.body;

  newMessage.id = messages.length + 1;

  messages.push(newMessage);

  for (let indx = subsList.length - 1; indx >= 0; indx--) {
    subsList[indx].json(newMessage);
    subsList.splice(indx, 1);
  }

  return res.status("204").end();
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

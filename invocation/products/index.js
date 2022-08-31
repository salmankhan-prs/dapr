const express = require("express");

const app = express();
app.use(express.json());
app.get("/test", (req, res) => {
  res.send("hello");
});
app.post("/add", (req, res) => {
  const random = Math.floor(Math.random() * 100);
  const data = req.body;
  console.log(data);
  data.random = random;
  res.send(data);
});

app.put("/add", async (req, res) => {
  const random = Math.floor(Math.random() * 100);
  const data = req.body;
  console.log(data);
  data.random = random;
  data.message = "PUT REQUEST PERFORMED ON PRODUCT SERVICE";
  res.send(data);
});

app.delete("/add", async (req, res) => {
  const random = Math.floor(Math.random() * 100);

  const data = {};
  data.random = random;
  data.message = "DELETE REQUEST PERFORMED ON PRODUCT SERVICE";
  res.send(data);
});

app.listen("4000", () => {
  console.log("SREVER STARTED ");
});

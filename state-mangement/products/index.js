const express = require("express");
const { CommunicationProtocolEnum, DaprClient } = require("@dapr/dapr");

const app = express();
app.use(express.json());

const client = new DaprClient(
  "127.0.0.1",
  "3502",
  CommunicationProtocolEnum.HTTP
);
const DAPR_STATE_STORE_NAME = "statestore";

app.get("/test", (req, res) => {
  res.send("hello");
});

app.get("/all", async (req, res) => {
  const result = await client.state.getBulk(DAPR_STATE_STORE_NAME, [
    "27",
    "45",
    "58",
  ]);
  res.send(result);
});

app.get("/user/:id", async (req, res) => {
  const result = await client.state.(DAPR_STATE_STORE_NAME, req.params.id);
  res.send(result);
});
app.post("/add", async (req, res) => {
  const random = Math.floor(Math.random() * 100);
  const data = req.body;
  const state = [
    {
      key: random.toString(),
      value: data,
    },
  ];

  // Save state into a state store
  await client.state.save(DAPR_STATE_STORE_NAME, state);
  console.log(data);

  res.send(state);
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

const express = require("express");
const dapr = require("@dapr/dapr");
const { default: axios } = require("axios");
const app = express();

app.use(express.json());
const client = new dapr.DaprClient(
  "127.0.0.1",
  "3500",
  dapr.CommunicationProtocolEnum.HTTP
);

app.get("/hello", async (req, res) => {
  const result = await client.invoker.invoke(
    "product",
    "test",
    dapr.HttpMethod.GET
  );

  console.log(result);
  res.send(result);
});

app.get("/user/:id", async (req, res) => {
  const result = await client.invoker.invoke(
    "product",
    `user/${req.params.id}`,
    dapr.HttpMethod.GET
  );
  res.send(result);
});
app.get("/all", async (req, res) => {
  const result = await client.invoker.invoke(
    "product",
    "all",
    dapr.HttpMethod.GET
  );

  console.log(result);
  res.send(result);
});
app.post("/data", async (req, res) => {
  // const apiRes = await axios.post(
  //   "http://localhost:3502/v1.0/invoke/product/method/add",
  //   req.body
  // );
  // const data = apiRes.data;
  const result = await client.invoker.invoke(
    "product",
    "add",
    dapr.HttpMethod.POST,
    req.body
  );
  console.log("result" + result);
  res.send(result);
});

app.put("/data", async (req, res) => {
  const result = await client.invoker.invoke(
    "product",
    "add",
    dapr.HttpMethod.PUT,
    req.body
  );
  res.send(result);
});

app.delete("/data", async (req, res) => {
  const result = await client.invoker.invoke(
    "product",
    "add",
    dapr.HttpMethod.DELETE
  );
  res.send(result);
});

app.listen("4001", () => {
  console.log("SREVER STARTED ");
});

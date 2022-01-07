import express from "express";
import { collectDefaultMetrics, register, Counter } from "prom-client";

collectDefaultMetrics();

const userAccess = new Counter({
  name: "test_app_user_access",
  help: "User accesses the app",
});

const app = express();

app.get("/", async (_req, res) => {
  userAccess.inc();
  try {
    res.set("Content-Type", "text/plain");
    res.end("Hello World!");
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get("/metrics", async (_req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(4001, "0.0.0.0");
console.log("Server listening on 0.0.0.0:4001");

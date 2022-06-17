import express from "express";
import expressWinston from "express-winston";
require("dotenv").config();
import api from "./controllers/api";
import YAML from "yamljs";
import { Logger } from "./lib/Logger";
const swaggerDocument = YAML.load("src/docs/swagger.yaml");

const port = process.env.PORT || "3600";
const server = express();

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.use("/api", api());

if (process.env.NODE_ENV != "test") {
  server.listen(+port, "0.0.0.0", () => {
    console.log(`Listening at http://0.0.0.0:${port}`);
  });
}

process.on("unhandledRejection", (reason: any, p) => {
  console.log("Unhandled Rejection:", reason, p);
});

export default server;

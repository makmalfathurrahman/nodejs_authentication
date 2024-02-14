import express from "express";
import route from "./routes/index.js";
import "dotenv/config";

export const app = express();

app.use(express.json());

app.use(route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.APP_PORT, "localhost", () => {
  console.info(`Server running on port ${process.env.APP_PORT}`);
});

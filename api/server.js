import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { main } from "./db/main.js";
import { peepsRouter } from "./routers/peepsRouter.js";

config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

main();

app.use(express.json());
app.use(cors());
app.use(`/`, peepsRouter);

const server = app.listen(port, host, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { main } from "./db/main.js";
import { peepsRouter } from "./routers/peepsRouter.js";
import {newPeepsRouter} from "./routers/newPeepsRouter.js";
import authRouter from "./routers/authRouter.js";
import authJwt from "./middleware/authJwt.js"
config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

main();

app.use(express.json());
app.use(cors());
app.use(`/auth`, authRouter);
app.use(`/peep`, peepsRouter);
app.use('/newPeep', [authJwt.verifyToken] , newPeepsRouter)

const server = app.listen(port, host, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;

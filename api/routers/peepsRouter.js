import express from "express";
import { allPeeps } from "../controllers/peep.controller.js";

const peepsRouter = express.Router();

peepsRouter.route(`/`).get(allPeeps);

export { peepsRouter };

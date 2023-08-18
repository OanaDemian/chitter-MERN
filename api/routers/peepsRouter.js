import express from "express";
import { allPeeps } from "../controllers/allPeeps.controller.js";

const peepsRouter = express.Router();

peepsRouter.route(`/`).get(allPeeps);

export { peepsRouter };

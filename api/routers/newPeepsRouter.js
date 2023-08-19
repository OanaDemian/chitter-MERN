import express from "express";
import { newPeep } from "../controllers/peep.controller.js";

const newPeepsRouter = express.Router();

newPeepsRouter.route(`/`).post(newPeep);

export { newPeepsRouter };

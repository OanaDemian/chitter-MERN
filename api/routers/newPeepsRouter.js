import express from "express";
import {newPeepValidation} from "../middleware/verifyPeep.js"
import { newPeep } from "../controllers/peep.controller.js";

const newPeepsRouter = express.Router();

newPeepsRouter.route(`/`).post(newPeepValidation, newPeep);

export { newPeepsRouter };

  
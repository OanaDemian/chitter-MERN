import express from "express";
import { body } from "express-validator";

import middlewareConfig from "../middleware/index.js";
import signingFunctions from "../controllers/auth.controller.js";

const authRouter = express.Router();

const { signin, signup } = signingFunctions;
const { verifySignUp } = middlewareConfig;

authRouter.use((req, res, next) => {
  res.header(
    `Access-Control-Allow-Headers`,
    `x-access-token, Origin, Content-Type, Accept`,
  );
  next();
});

authRouter.post(
  `/signup`,
  [
    body(`email`).exists().normalizeEmail().escape().isEmail(),
    body(`username`).exists().escape(),
    body(`password`).exists().escape(),
    verifySignUp,
  ],
  signup,
);

authRouter.post(
  `/signin`,
  [body(`username`).exists().escape(), body(`password`).exists().escape()],
  signin,
);

export default authRouter;

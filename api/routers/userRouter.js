import express from 'express';

import userControllers from '../controllers/user.controller.js';
import middlewareConfig from '../middleware/index.js';

const userRouter = express.Router();

const { allAccess, userBoard} = userControllers;
const { authJwt } = middlewareConfig;

userRouter.use((req, res, next) => {
    res.header(`Access-Control-Allow-Headers`, `x-access-token, Origin, Content-Type, Accept`);
    next();
});

userRouter.get(`/all`, allAccess);

userRouter.get(`/user`, [authJwt.verifyToken], userBoard);


export default userRouter;
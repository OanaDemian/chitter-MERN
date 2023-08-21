import authJwt from "./authJwt.js";
import verifySignUp from "./verifySignUp.js";

const middlewareConfig = { authJwt, verifySignUp };

export default middlewareConfig;

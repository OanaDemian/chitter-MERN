import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: `No token provided` });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(401).send({ message: `Unauthorised` });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    req.name = decoded.name;
    next();
  });
};

const authJwt = {
  verifyToken,
};

export default authJwt;

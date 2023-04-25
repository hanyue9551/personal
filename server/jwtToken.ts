import express from "express";
const jwt = require("jsonwebtoken");
const { expressjwt: expressJWT } = require("express-jwt");
const app = express();

const secretKey = "xnhjToken"; // 小韩token

app.use(
  expressJWT({
    secret: secretKey,
    algorithms: ["HS256"],
  }).unless({ path: [/^(\/personal\|\/register\/)/] })
);

export const jwtSign = (data) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

export const jwtCheck = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      res.send({
        code: 999,
        message: "token无效",
      });
    } else {
      req.jwtInfo = data;
      next();
    }
  });
};

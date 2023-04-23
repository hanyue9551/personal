import express from "express";

const cors = require("cors");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJWT } = require("express-jwt");
const apiRouter = require("./apiRouter.ts");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use((req, res, next) => {
//   next();
// });

const secretKey = "tokenKey";
app.use(
  expressJWT({
    secret: secretKey,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/personal\//] })
);

app.use("/", apiRouter);

app.listen(3000, () => {
  console.log("3000 running");
});

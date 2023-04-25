import express from "express";

const cors = require("cors");
const apiRouter = require("./apiRouter.ts");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRouter);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效token",
    });
  }
  console.log(err, req, res);
  // res.send({
  //   status: 500,
  //   message: "未知错误",
  // });
});

app.listen(3000, () => {
  console.log("3000 running");
});

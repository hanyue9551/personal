import express from "express";
import { jwtSign } from "./jwtToken.ts";
const router = express.Router();
import db from "./mysql.ts";
import bcrypt from "bcrypt";

router.use((req, res, next) => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const createTime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  req.createTime = createTime;
  next();
});

router.post("/login", (req, res) => {
  const userinfo = req.body;
  const hashPwd = bcrypt.hashSync(userinfo.password, 10);
  const sqlSelect =
    "select * from management_user where username = ?";
  db.query(sqlSelect, [userinfo.username, hashPwd], (err, result) => {
    console.log(err, result)
    if (err || result.length === 0) {
      res.send(err);
    } else {
      res.send({
        code: 1,
        message: "登录成功",
        token: jwtSign({ username: userinfo.username }),
      });
    }
  });
});

router.post("/register", (req, res) => {
  const info = req.body;
  const hashPwd = bcrypt.hashSync(info.password, 10);
  const createTime = req.createTime;

  const sqlSelect = "select * from management_user where username = ?";
  db.query(sqlSelect, [info.username], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        // 重复用户名
        res.send({
          code: 2,
          message: "用户名重复",
        });
      } else {
        const sqlInsert =
          "insert into management_user(username, password, createTime) values (?, ?, ?)";
        db.query(
          sqlInsert,
          [info.username, hashPwd, createTime],
          (errInsert, result) => {
            if (errInsert) {
              res.send(errInsert);
            } else {
              res.send({
                code: 1,
                message: "注册成功",
              });
            }
          }
        );
      }
    }
  });
});

module.exports = router;

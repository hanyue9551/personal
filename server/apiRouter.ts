import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const userinfo = req.body;
  res.send({
    code: 1,
    message: "登录成功",
  });
});

router.get("/get", (req, res) => {
  const query = req.query;

  res.send({
    status: 1, // 0 失败 1 成功
    msg: "GET 请求成功",
    data: query,
  });
});

router.post("/post", (req, res) => {
  const body = req.body;
  res.send({
    status: 1,
    msg: "POST 请求成功",
    data: body,
  });
});

module.exports = router;

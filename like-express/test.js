const express = require("./index");

const app = express();

app.use((req, res, next) => {
  console.log("请求开始", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  console.log("处理cookie");
  req.cookie = {
    userId: "abc123"
  };
  next();
});

app.use("/api", (req, res, next) => {
  console.log("处理api路由");
  next();
});

app.get("/api", (req, res, next) => {
  console.log("处理get api路由");
  next();
});

app.get("/api/get-cookie", (req, res, next) => {
  console.log("处理get api/get-cookie路由");
  res.json({
    data: "哈哈哈哈"
  })
});

app.get("/api/get-blog", (req, res, next) => {
  console.log("处理get api/get-cookie路由");
  res.json({
    data: "雅虎黑"
  })
});

app.listen(8010, () => {
  console.log("监听8010。。。。");
});
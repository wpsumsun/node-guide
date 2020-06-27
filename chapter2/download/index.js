const koa = require("koa");
const mount = require("koa-mount");
const serve = require("koa-static");
const fs = require("fs");

const app = new koa();

app.use(serve(__dirname + "/source"));

app.use(mount("/", ctx => {
  ctx.body = fs.readFileSync(__dirname + "/source/index.htm", "utf-8");
}));

app.listen(3000);
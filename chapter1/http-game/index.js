const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

const game = require("./game");

let playerWonTimes = 0;

http.createServer((req, res) => {
  const parseUrl = url.parse(req.url);
  if (parseUrl.pathname === "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (parseUrl.pathname === "/") {
    fs.createReadStream(__dirname + "/index.html").pipe(res);
  }
  if (parseUrl.pathname === "/game") {
    const query = querystring.parse(parseUrl.query);
    const playerAction = query.action;
    
    if (playerWonTimes >= 3) {
      res.writeHead(500);
      res.end("不和你玩了");
    }
    
    const result = game(playerAction);
    res.writeHead(200);
    if (result === 0) {
      res.end("平局");
    } else if (result === -1) {
      res.end("你输了");
    } else {
      res.end("你赢了");
      playerWonTimes += 1;
    }
  }
}).listen(3000);
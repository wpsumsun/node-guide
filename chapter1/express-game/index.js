const express = require("express");
const querystring = require("querystring");
const fs = require("fs");
const url = require("url");
const game = require("./game");

const app = new express();
app.listen(3000);

let playerWonTimes = 0;

app.get("/favicon.icon", (req, res) => {
  res.status(200);
  res.send();
  return;
});

app.get("/", (req, res) => {
  res.send(fs.readFileSync(__dirname + "/index.html", "utf-8"));
});

app.get("/game", (req, res) => {
  const query = req.query;
  const playerAction = query.action;
  
  if (playerWonTimes >= 3) {
    res.status(500);
    res.send("不和你玩了");
    return;
  }
  
  const result = game(playerAction);
  res.status(200);
  if (result === 0) {
    res.send("平局");
  } else if (result === -1) {
    res.send("你输了");
  } else {
    res.send("你赢了");
    playerWonTimes += 1;
  }
});
const playerAction = process.argv[process.argv.length - 1];
const game = require("./game");

let count = 0;
process.stdin.on("data", e => {
  let action = e.toString().trim();
  const result = game(action);
  if (result === 1) count += 1;
  if (count === 3) process.exit(0);
});
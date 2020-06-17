const playerAction = process.argv[process.argv.length - 1];
const actionsMapping = ['rock', 'scissor', 'paper'];
const randomAction = actionsMapping[parseInt(Math.random() * 3)];

if (randomAction === playerAction) {
  console.log("draw");
} else if (
  (playerAction === 'rock' && randomAction === 'scissor') ||
  (playerAction === 'scissor' && randomAction === 'paper') ||
  (playerAction === 'paper' && randomAction === 'rock')
) {
  console.log("you lost");
} else {
  console.log("you win");
}
module.exports = function (playerAction) {
  const actionsMapping = ['rock', 'scissor', 'paper'];
  if (!actionsMapping.includes(playerAction)) return;
  const randomAction = actionsMapping[parseInt(Math.random() * 3)];
  
  if (randomAction === playerAction) {
    console.log("draw");
    return 0;
  } else if (
    (playerAction === 'rock' && randomAction === 'scissor') ||
    (playerAction === 'scissor' && randomAction === 'paper') ||
    (playerAction === 'paper' && randomAction === 'rock')
  ) {
    console.log("you lost");
    return -1;
  } else {
    console.log("you win");
    return 1;
  }
};
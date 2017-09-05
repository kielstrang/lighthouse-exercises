var numDice = process.argv[2];

var rolls = 'Rolled ' + numDice + ' dice: ';

if(isNaN(numDice) || numDice <= 0) {
  rolls = 'Rolled no dice';
} else {
  rolls += rollDice(numDice).join(', ');
}

console.log(rolls);


function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice(num) {
  var rolls = [];
  for (var i = 0; i < num; i++) {
    rolls.push(rollDie());
  }
  return rolls;
}
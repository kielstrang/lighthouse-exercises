function getCharacterPositions (string) {
  var positions = {};
  for (var i = 0; i < string.length; i++) {
    var letter = string[i];
    if(letter === ' ') {
      continue;
    }

    if (letter in positions) {
      positions[letter].push(i);
    } else {
      positions[letter] = [i];
    }
  }
  return positions;
}

console.log(getCharacterPositions(process.argv[2]));
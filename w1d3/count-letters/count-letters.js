function countLetters (string) {
  var counts = {};
  for (var i = 0; i < string.length; i++) {
    var letter = string[i];
    if(letter === ' ') {
      continue;
    }

    if (letter in counts) {
      counts[letter] += 1;
    } else {
      counts[letter] = 1;
    }
  }
  return counts;
}

console.log(countLetters(process.argv[2]));
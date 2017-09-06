var words = ["ground", "control", "to", "major", "tom"];

function map(arr, callback) {
  var output = [];
  for (var element of arr) {
    output.push(callback(element));
  }
  return output;
}

var lengths = map(words, function(word) {
  return word.length;
});
console.log(lengths, ' should match ', [6, 7, 2, 5, 3]);

var upperCase = map(words, function(word) {
  return word.toUpperCase();
});
console.log(upperCase, ' should match ', [ "GROUND", "CONTROL", "TO", "MAJOR", "TOM" ]);

var reversed = map(words, function(word) {
  return word.split('').reverse().join('');
});
console.log(reversed, ' should match ', [ 'dnuorg', 'lortnoc', 'ot', 'rojam', 'mot' ]);
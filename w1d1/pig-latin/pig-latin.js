var args = require('optimist').argv._;

var list = '';
for (var i = 0; i < args.length; i++) {
  list += convertToPigLatin(args[i]) + ' ';
}
console.log(list);

function convertToPigLatin(string) {
  var pig_latin = '';
  for (var i = 1; i < string.length; i++) {
    pig_latin += string[i];
  }
  pig_latin += string[0] + 'ay';
  return pig_latin;
}
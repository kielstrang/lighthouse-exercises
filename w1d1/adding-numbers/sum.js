var args = require('optimist').argv;
console.log(args);

function add(a, b) {
  return Number(a) + Number(b);
}

var sum = args._.reduce(add);

console.log(sum);
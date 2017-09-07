function makeLoadedDie() {
  var list = [5, 4, 6, 1, 6, 4, 2, 3, 3, 5];
  var count = 0;

  return function() {
    var roll = list[count];
    count += 1;
    if (count >= list.length) {
      count = 0;
    }
    return roll;
  };
}

var rollLoadedDie = makeLoadedDie();

console.log(rollLoadedDie());
console.log(rollLoadedDie());
console.log(rollLoadedDie());
var reduce = function(array, callback, initialValue) {
  var accumulator = (initialValue === undefined) ? array[0] : initialValue;
  for (var currentIndex = 0; currentIndex < array.length; currentIndex++) {
    var currentValue = array[currentIndex];
    accumulator = callback(accumulator, currentValue, currentIndex, array);
  }
  return accumulator;
};

var total = reduce([0, 1, 2, 3], function(sum, value) {
  return sum + value;
}, 0);

console.log(total);
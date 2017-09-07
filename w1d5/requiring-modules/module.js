function sum (a, b) {
  return a + b;
}

module.exports = {
  printSum : function (a, b) {
    console.log(`The sum of ${a} and ${b} is ${sum(a,b)}.`);
  }
}
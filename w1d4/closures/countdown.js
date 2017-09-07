var countdownGenerator = function (x) {
  var count = x;
  return function () {
    switch(true) {
    case count > 0:
      console.log(`T-minus ${count}`);
      break;
    case count === 0:
      console.log('Blast Off!');
      break;
    default:
      console.log('Rockets already gone, bub!');
    }
    count -= 1;
  };
};

var countdown = countdownGenerator(3);
countdown();
countdown();
countdown();
countdown();
countdown();
countdown();
var check = function (inputNumber) {
  if (isNaN(inputNumber)) return false;
  var digits = inputNumber.toString().split('').map(Number);
  var sum = 0;
  for (var i = digits.length - 1; i >= 0; i--) {
    var digit = digits[i];
    if (i % 2 > 0) digit = digit * 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return sum % 10 === 0;
};

module.exports = check;
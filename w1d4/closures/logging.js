var wrapLog = function (callback, name) {
  return function() {
    var result = callback.apply(this, arguments);
    console.log(`${name}(${[...arguments].join(', ')}) => ${result}`);
    return result;
  };
};

var area = function (x, y) {
  return x * y;
};
var logArea = wrapLog(area, "area");

logArea(5, 3);
logArea(3, 2);

var volume = function (x, y, z) {
  return x * y * z;
};
var logVolume = wrapLog(volume, "volume");

logVolume(5, 3, 2);
logVolume(3, 2, 4);
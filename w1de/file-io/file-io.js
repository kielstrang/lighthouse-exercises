var fs = require('fs');

var filePath = process.argv[2];

fs.readFile(filePath, function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log(data.toString());
});
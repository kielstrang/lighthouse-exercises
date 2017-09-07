var assert = require("chai").assert;
var check = require("../lib/luhn-check");

var validNumber = 87213;
var wrongChecksum = 87210;
var singleReplace = 86213;
var transpose = 82713;

describe("check", function() {
  it("should return false if input is not a number", function() {
    var input = "thisisnotanumber";
    var result = check(input);
    assert.isFalse(result);
  });

  it("should return true if input is a Luhn valid number", function() {
    var input = validNumber;
    var result = check(input);
    assert.isTrue(result);
  });

  it("should return false if input has the wrong checksum", function() {
    var input = wrongChecksum;
    var result = check(input);
    assert.isFalse(result);
  });

  it("should return false if input has a single-digit replacement", function() {
    var input = singleReplace;
    var result = check(input);
    assert.isFalse(result);
  });

  it("should return false if input has a transposition", function() {
    var input = transpose;
    var result = check(input);
    assert.isFalse(result);
  });
});

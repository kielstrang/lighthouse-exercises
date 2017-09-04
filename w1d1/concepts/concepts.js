var conceptList = ["gists", "types", "operators", "iteration", "problem solving"];

var concepts = joinList(conceptList);

function joinList(list) {
  var joined = list[0];
  for(var i = 1; i < list.length; i++) {
    joined += ', ' + list[i];
  }
  return joined !== undefined ? joined : '';
}

console.log("Today I learned about " + concepts + ".");

var getTotalBottles = function(recycling) {
  if(recycling.fullBottles === 0) return recycling;

  recycling.totalBottles += recycling.fullBottles;
  recycling.emptyBottles += recycling.fullBottles;
  recycling.caps += recycling.fullBottles;

  var fromEmptyBottles = Math.floor(recycling.emptyBottles / 2);
  var fromCaps = Math.floor(recycling.caps / 4);

  recycling.fullBottles = fromEmptyBottles + fromCaps;
  recycling.fromEmptyBottles += fromEmptyBottles;
  recycling.fromCaps += fromCaps;

  recycling.emptyBottles %= 2;
  recycling.caps %= 4;
  return getTotalBottles(recycling);
}

var getBottlesPurchased = function(dollars) {
  var initialPurchase = {
    totalBottles : 0,
    fullBottles : (Math.floor(dollars / 2)),
    fromEmptyBottles : 0,
    fromCaps : 0,
    emptyBottles : 0,
    caps : 0
  };
  return getTotalBottles(initialPurchase);
}

var printResults = function(recycling) {
  console.log('Total Bottles: ', recycling.totalBottles);
  console.log('Remaining Empty Bottles: ', recycling.emptyBottles);
  console.log('Remaining Caps: ', recycling.caps);
  console.log('Total Earned:');
  console.log('  Bottles: ', recycling.fromEmptyBottles);
  console.log('  Caps: ', recycling.fromCaps);
}

var investment = process.argv[2];
printResults(getBottlesPurchased(investment));
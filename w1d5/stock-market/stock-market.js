function maxProfit(stockPrices) {
  var maxProfitAtTime = stockPrices.map(function(currentPrice, index, prices) {
    var maxPriceAfter = Math.max.apply(0, prices.slice(index));
    var profit = maxPriceAfter - currentPrice;
    return profit > 0 ? profit : -1;
  });
  return Math.max.apply(0, maxProfitAtTime);
}

function fastMaxProfit(stockPrices) {
  if(stockPrices.length <= 1) {
    return -1;
  }

  var firstHalf = stockPrices.splice(0, Math.floor(stockPrices.length / 2));
  var minInFirstHalf = Math.min.apply(0, firstHalf);
  var secondHalf = stockPrices;
  var maxInSecondHalf = Math.max.apply(0, secondHalf);

  return Math.max.apply(0, [fastMaxProfit(firstHalf), fastMaxProfit(secondHalf), maxInSecondHalf - minInFirstHalf]);
}

var prices = [45, 24, 35, 31, 40, 38, 11];
console.log(fastMaxProfit(prices));
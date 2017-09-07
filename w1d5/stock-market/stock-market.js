function maxProfit(stockPrices) {
  var maxProfitAtTime = prices.map(function(currentPrice, index, prices) {
    var maxPriceAfter = Math.max.apply(0, prices.slice(index));
    return maxPriceAfter - currentPrice;
  });
  return Math.max.apply(0, maxProfitAtTime);
}

var prices = [45, 24, 35, 31, 40, 38, 11];
console.log(maxProfit(prices));

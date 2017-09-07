function maxProfit(stockPrices) {
  var maxProfitAtTime = prices.map(function(currentPrice, index, prices) {
    var maxPriceAfter = Math.max.apply(this, prices.slice(index));
    var profit = maxPriceAfter - currentPrice;
    return profit > 0 ? profit : -1;
  });
  return Math.max.apply(this, maxProfitAtTime);
}

// var prices = [45, 24, 35, 31, 40, 38, 11];
var prices = [3,2,1];
console.log(maxProfit(prices));

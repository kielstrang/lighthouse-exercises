const max = arr => Math.max(...arr);
const min = arr => Math.min(...arr);

function maxProfit(stockPrices) {
  var maxProfitAtTime = stockPrices.map(function(currentPrice, index, prices) {
    var maxPriceAfter = max(prices.slice(index));
    var profit = maxPriceAfter - currentPrice;
    return profit > 0 ? profit : -1;
  });
  return Math.max(...maxProfitAtTime);
}

function fastMaxProfit(stockPrices) {
  if(stockPrices.length <= 1) {
    return -1;
  }

  var firstHalf = stockPrices.splice(0, Math.floor(stockPrices.length / 2));
  var secondHalf = stockPrices;

  return max([max(secondHalf) - min(firstHalf), fastMaxProfit(firstHalf), fastMaxProfit(secondHalf)]);
}

var prices = [45, 24, 35, 31, 40, 38, 11];
console.log(fastMaxProfit(prices));
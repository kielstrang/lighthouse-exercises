function calculateTax(sales, taxRate) {
  return sales * taxRate;
}

function getTaxInProvince(sales, province, rates) {
  if(province in rates) {
    return calculateTax(sales, rates[province]);
  }
  throw "No tax rate specified for this province";
}

function createNewCompany() {
  return { totalSales : 0, totalTaxes : 0 };
}

function getTotalSales(salesList) {
  return salesList.reduce(function(a, b) {return a + b}, 0);
}


function calculateSalesTax(salesData, taxRates) {
  var totals = {};
  for(var i in salesData) {
    var dataSet = salesData[i];

    var companyName = dataSet['name'];
    if(!(companyName in totals)) {
      totals[companyName] = createNewCompany();
    }

    var sales = getTotalSales(dataSet['sales']);
    totals[companyName]['totalSales'] += sales;

    var province = dataSet['province'];
    totals[companyName]['totalTaxes'] += getTaxInProvince(sales, province, taxRates);
  }
  return totals;
}

var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);
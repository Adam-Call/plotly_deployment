var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
var topFiveCities = sortedCities.slice(0,5);
var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));

console.log(topFiveCityGrowths);

var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);

var topPop = cityGrowths.sort((a,b) => a.population - b.population).reverse();
var topSevenCities = topPop.slice(0,7);
var topPopNames = topSevenCities.map(city => city.City);
var topPopPop = topSevenCities.map(city => parseInt(city.population));

var trace = {
    x: topPopNames,
    y: topPopPop,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Largest Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population"}
  };
  Plotly.newPlot("bar-plot", data, layout);

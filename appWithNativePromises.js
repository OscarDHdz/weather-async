const request = require('request');
const yargs = require('yargs');
// As Callbacks
/*
const geocode = require('./geocode/geocode.js');
const forecast = require('./forecast/forecast.js');
*/
// As Promises
const geocode = require('./geocode/geocodePromise.js');
const forecast = require('./forecast/forecastPromise.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

//console.log(argv);
debugger;

console.log('Starter Request');
// AS Callbacks
/*
geocode.geocodeAddress( argv.address, (errorMessage, results) => {
  if ( errorMessage ) {
    console.log(errorMessage);
  } else {
    //console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);
    forecast.getTemperature( results.latitude, results.longitude, ( errorMessage, results ) => {
      if ( errorMessage ) {
        console.log(errorMessage);
      }
      else {
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}`);
      }
    });


  }
});*/

// Ass Promises
geocode.geocodeAddress( argv.address )
  .then((res) => {
    console.log(res.address);
    return forecast.getTemperature( res.latitude, res.longitude );
  })
  .then((res) => {
    console.log(`It's currently ${res.temperature}. It feels like ${res.apparentTemperature}`);
  })
  .catch( (errorMessage) => {
    console.log(errorMessage);
  });


console.log('Finished Main()');
// 4c8c1e6f271731cde663bd691663a8e0
//https://api.darksky.net/forecast/4c8c1e6f271731cde663bd691663a8e0/25.5306707,-103.4270438

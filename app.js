const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

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

var ecodedAddress = encodeURIComponent( argv.address );
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${ ecodedAddress }`;

axios.get(geocodeUrl).then(
  (response) => {
    if ( response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that adress');
    }
    console.log(response.data.results[0].formatted_address);
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var forecastUrl = `https://api.darksky.net/forecast/4c8c1e6f271731cde663bd691663a8e0/${latitude},${longitude}`;
    return axios.get(forecastUrl);
  })
  .then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
  })
  .catch((e)  => {
    if ( e.code === 'ENOTFOUND' ) {
      console.log('Unable to connect to API Server');
    }
    else {
      console.log(e.message);
    }
  })

//console.log(argv);
debugger;

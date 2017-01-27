const request = require('request');

var getTemperature = ( latitude, longitude, callback ) => {
  request({
    url: `https://api.darksky.net/forecast/4c8c1e6f271731cde663bd691663a8e0/${latitude},${longitude}`,
    json: true
  }, (error, response, body ) => {
    if ( !error && response.statusCode === 200 ){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
    else {
      callback('Unable to fecth weather');
    }
  });
}



module.exports = {
  getTemperature
}
